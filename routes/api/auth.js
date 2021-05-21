const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// Middlewares
const validate_register = require("../../middleware/validation/auth/register");

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

router.post("/register", validate_register, async (req, res) => {
  const { email, password, password_confirm } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) throw Error("Email already exists");

    // const salt = await bcrypt.genSalt();
    const salt = bcrypt.genSaltSync();
    if (!salt) throw Error("User could not be saved");

    // const hash = await bcrypt.hash(password, salt);
    const hash = bcrypt.hashSync(password, salt);
    if (!hash) throw Error("User could not be saved");

    const newUser = new User({
      email,
      password: hash,
    });

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

router.post("/login", async (req, res) => {
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
