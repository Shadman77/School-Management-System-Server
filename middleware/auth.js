const jwt = require("jsonwebtoken");

const check_if_logged_in = (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res.json({
      msg: "Token not present",
    });
  }

  try {
    const decoded = jwt.verify(token, "Password");
    req.user = decoded; //{email: dvfguywerbvfg}
    next();
  } catch {
    return res.json({
      msg: "Invalid Token",
    });
  }
};

module.exports = check_if_logged_in;
