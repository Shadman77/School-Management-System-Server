const router = require("express").Router();
const auth_middleware = require("../../middleware/auth");

router.get("/a", auth_middleware, (req, res) => {
  return res.json({
    msg: "Protected info",
  });
});

module.exports = router;
