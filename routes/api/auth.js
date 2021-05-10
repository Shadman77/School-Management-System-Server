const router = require("express").Router();

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

  const newUser = new User({
    email,
    password,
    password_confirm,
  });

  try {
    const user = await User.findOne({ email });

    if (user) throw Error("Email already exists");

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("User could not be saved");

    return res.json({
      msg: "User saved",
    });
  } catch (err) {
    return res.json({
      msg: err.message,
    });
  }
});

module.exports = router;
