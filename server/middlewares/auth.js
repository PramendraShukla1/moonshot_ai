const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized user!" });
  }
  try {
    const tokenDecode = jwt.verify(token, secret);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not Authorized user!" });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = userAuth;
