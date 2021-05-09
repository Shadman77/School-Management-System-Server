const router = require("express").Router();

const User = require("../../models/User");

// Middlewares
const validate_register = require("../../middleware/validation/auth/register");

router.post("/register", validate_register, (req, res) => {
  console.log(req.body);

  const newUser = User({
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      return res.json({
        msg: "User saved",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        msg: "User could not be saved",
      });
    });
});

module.exports = router;
