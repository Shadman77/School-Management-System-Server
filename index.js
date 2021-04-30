const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.json({
    msg: "Hello World",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
