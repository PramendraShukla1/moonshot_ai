const express = require("express");
const {
  registerUser,
  loginUser,
  userCredit,
  paymentRazorpay,
  verifyRazorpay,
} = require("../controllers/userController");
const userAuth = require("../middlewares/auth");

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.get("/credits", userAuth, userCredit);
Router.post("/pay-razorpay", userAuth, paymentRazorpay);
Router.post("/verify-razorpay", verifyRazorpay);

module.exports = Router;
