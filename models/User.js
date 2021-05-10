const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registration_date: { type: Date, default: Date.now },
});

UserSchema.index({ email: 1 }, { unique: true });

User = mongoose.model("users", UserSchema);
module.exports = User
