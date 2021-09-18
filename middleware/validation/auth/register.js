const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validate = (req, res, next) => {
  console.log("Middleware");
  const email = req.body.email;
  const password = req.body.password;
  const password_confirm = req.body.password_confirm;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const type = req.body.type;

  const phonenum = req.body.phonenum;
  const gender = req.body.gender;

  //type
  if (typeof type === "undefined") {
    return res.status(400).json({
      msg: "type is required",
      field: ["type"],
    });
  } else {
    //if student type,choose class level
    if (req.body.type.includes("student")) {
      const classLevel = req.body.classLevel;
      if (typeof classLevel === "undefined") {
        return res.status(400).json({
          msg: "class is required",
          field: ["class"],
        });
      }
    }
  }
  // Email
  if (typeof email === "undefined") {
    return res.status(400).json({
      msg: "Email required",
      field: ["email"],
    });
  }
  //phone
  if (req.body.phonenum.length != 11) {
    return res.status(400).json({
      msg: "Phone number must be 11 digits",
    });
  }
  if (typeof phonenum === "undefined") {
    return res.status(400).json({
      msg: "Phone number is required",
      field: ["phonenum"],
    });
  }

  //gender
  if (typeof gender === "undefined") {
    return res.status(400).json({
      msg: "gender is required",
      field: ["gender"],
    });
  }

  if (typeof firstname === "undefined") {
    return res.status(400).json({
      msg: "firstname is required",
      field: ["firstname"],
    });
  }
  if (typeof lastname === "undefined") {
    return res.status(400).json({
      msg: "lastname is required",
      field: ["lastname"],
    });
  }

  // if (!req.body.email.includes("@")) {
  if (!validateEmail(email)) {
    return res.status(400).json({
      msg: "Email is invalid",
      field: ["email"],
    });
  }

  //  Password
  if (typeof req.body.password === "undefined") {
    return res.status(400).json({
      msg: "Password required",
      field: ["password"],
    });
  }

  if (req.body.password.length <= 6) {
    return res.status(400).json({
      msg: "password length must be greater than 6 characters",
      field: ["password"],
    });
  }

  var contains_upper_case = false;
  for (var i = 0; i < req.body.password.length; i++) {
    if (req.body.password[i] == req.body.password[i].toUpperCase()) {
      contains_upper_case = true;
    }
  }

  if (!contains_upper_case) {
    return res.status(400).json({
      msg: "Password must contain an uppercase",
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
