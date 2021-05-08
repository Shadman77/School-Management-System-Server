const express = require("express");
const app = express();

// Using middleware for json support
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    msg: "Hello World",
  });
});

app.get("/:msg", (req, res) => {
  console.log(req.params.msg);
  return res.json({
    msg: req.params.msg,
  });
});

app.post("/upload", (req, res) => {
  console.log(req.body);
  return res.json({
    msg: "Data Recieved",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
