const express = require("express");
const app = express();

// Using middleware for json support
app.use(express.json());

// Serving static file
app.use(express.static("public"));

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
  // console.log(req.body);
  // console.log(req.body.id);
  return res.json({
    msg: "Data Recieved",
  });
});

// Import a route file
app.use("/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
