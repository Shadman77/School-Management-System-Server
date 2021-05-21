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
    // console.log(ewf)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //{email: dvfguywerbvfg}
    next();
  } catch (e) {
    if (e.name === "JsonWebTokenError")
      return res.json({
        msg: "Invalid Token",
      });
    else if (e.name === "TokenExpiredError")
      return res.json({
        msg: "Please login again",
      });
    else {
      console.log(e);
      return res.json({
        msg: "Please contact support",
      });
    }
  }
};

module.exports = check_if_logged_in;
