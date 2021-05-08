const router = require("express").Router();

// Middlewares
const validate_register = require("../../middleware/validation/auth/register");

router.post("/register", validate_register, (req, res) => {
  console.log(req.body);
  return res.json({
    msg: "Data recieved",
  });
});

module.exports = router;
