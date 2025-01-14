const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const razorpay = require("razorpay");
const dotenv = require("dotenv");
const transactionModel = require("../models/TransactionModel");
dotenv.config();

//! Register API
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign(
      { username: user.username, email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { username: user.username, id: user._id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//! Login API
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user._id,
        creditBalance: user.creditBalance,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({
      success: true,
      token,
      user: user.username,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//! api for user credit balance

const userCredit = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.username },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//! Razorpay payment gateway
const razorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await User.findById(userId);
    if (!userData || !planId) {
      return res.json({ success: false, message: "missing details!" });
    }
    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        (plan = "Basic"), (credits = 100), (amount = 5360.67);
        break;
      case "Advanced":
        (plan = "Advanced"), (credits = 1000), (amount = 29908.26);
        break;
      case "Business":
        (plan = "Business"), (credits = 5000), (amount = 73770.64);
        break;
      default:
        return res.json({ success: false, message: "plan not found" });
    }
    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorPayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment Failed!" });
      }
      const userData = await User.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await User.findByIdAndUpdate(userData._id, { creditBalance });

      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      res.json({ success: true, message: "credits added to account" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userCredit,
  paymentRazorpay,
  verifyRazorpay,
};
