const jwt = require("jsonwebtoken");

const check_if_logged_in = (req, res, next) => {
  console.log("Middleware");
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.json({
      msg: "Token not present",
    });
  }

  try {
    const decoded_token = jwt.verify(token, "Password");
    next();
  } catch {
    return res.json({
      msg: "Invalid Token",
    });
  }
};

module.exports = check_if_logged_in;
