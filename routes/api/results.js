const router = require("express").Router();
const auth_middleware = require("../../middleware/auth");

router.use(auth_middleware);

router.get("/grade", (req, res) => {
  return res.json({
    msg: "Protected info",
  });
});

router.get("/marks", (req, res) => {
  return res.json({
    msg: "Protected info",
  });
});

module.exports = router;
