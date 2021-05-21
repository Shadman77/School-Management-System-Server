const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Create environment variables
require("dotenv").config();

// Middlewares
app.use(express.json());

// Connect to database
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//Import a route file
app.use("/auth", require("./routes/api/auth"));
app.use("/results", require("./routes/api/results"));
app.use("/account", require("./routes/api/account"));

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
