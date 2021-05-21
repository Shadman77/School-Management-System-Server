const router = require("express").Router();
const auth_middleware = require("../../middleware/auth");

router.get("/dashboard", auth_middleware, (req, res) => {
  return res.json({
    msg: "Welcome " + req.user.email,
  });
});

module.exports = router;
