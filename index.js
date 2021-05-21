const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middlewares
app.use(express.json());

// Connect to database
ATLAS_URI =
  "mongodb+srv://user:2cw87BkCbPifyQBn@cluster0.xnydm.mongodb.net/School_Management?retryWrites=true&w=majority";
mongoose
  .connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

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
    msg: "data received",
  });
});
//Import a route file
app.use("/auth", require("./routes/api/auth"));
app.use("/results", require("./routes/api/results"));
app.use("/account", require("./routes/api/account"));

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
