const validate = (req, res, next) => {
  console.log("Middleware");
  password = req.body.password;
  password_confirm = req.body.password_confirm;

  if (typeof req.body.email === "undefined") {
    return res.status(400).json({
      msg: "Email required",
      field: ["email"],
    });
  }

  if (typeof req.body.password === "undefined") {
    return res.status(400).json({
      msg: "Password required",
      field: ["password"],
    });
  }

  if (typeof req.body.password_confirm === "undefined") {
    return res.status(400).json({
      msg: "Password needs to be confirmed",
      field: ["password_confirm"],
    });
  }

  if (password !== password_confirm) {
    return res.status(400).json({
      msg: "Password did not match",
      field: ["password", "password_confirm"],
    });
  }

  next();
};

module.exports = validate;
