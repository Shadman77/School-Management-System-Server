const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// Middlewares
const validate_register = require("../../middleware/validation/auth/register");
const validate_login = require("../../middleware/validation/auth/login");

// router.post("/register", validate_register, (req, res) => {
//   // console.log(req.body);

//   const newUser = User({
//     email: req.body.email,
//     password: req.body.password,
//   });

//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (user) {
//         return res.json({
//           msg: "Email already exists",
//         });
//       } else {
//         newUser
//           .save()
//           .then(() => {
//             return res.json({
//               msg: "User saved",
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//             return res.json({
//               msg: "User could not be saved",
//             });
//           });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.json({
//         msg: "User could not be saved",
//       });
//     });
// });

// role=>teacher or student
// studentid
// teacherid
// student_class: number of the class
// previous fields as is
router.post("/register", validate_register, async (req, res) => {
  const {
    email,
    password,
    password_confirm,
    firstname,
    lastname,
    classLevel,
    type,
    phonenum,
    gender,
  } = req.body;

  console.log(classLevel);

  try {
    const user = await User.findOne({ email });

    if (user) throw Error("Email already exists");

    // const salt = await bcrypt.genSalt();
    const salt = bcrypt.genSaltSync();
    if (!salt) throw Error("User could not be saved");

    // const hash = await bcrypt.hash(password, salt);
    const hash = bcrypt.hashSync(password, salt);
    if (!hash) throw Error("User could not be saved");

    // console.log("While Creating");
    const newUser = new User({
      email,
      password: hash,
      firstname,
      lastname,
      classLevel,
      type,
      phonenum,
      gender,
    });

    // console.log("While saving");
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("User could not be saved");

    return res.json({
      msg: "User saved",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      msg: err.message,
    });
  }
});

// check if email is given and valid
// check if password is given
router.post("/login", validate_login, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("Email does not exist");

    const password_matched = await bcrypt.compare(password, user.password);
    if (!password_matched) throw Error("Wrong credentials");

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    console.log("Here");
    return res.json({
      msg: "Login successfull",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      msg: err.message,
    });
  }
});

module.exports = router;
