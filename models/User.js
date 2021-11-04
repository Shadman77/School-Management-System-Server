const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  classLevel: {
    type: String,
    enum: [
      "Play Group",
      "Nursery",
      "KG",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "O Levels",
      "A Levels",
    ],
    required: false,
  },
  type: { type: String, enum: ["Student", "Teacher", "Admin"], required: true },
  phonenum: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  password: { type: String, required: true },
  registration_date: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
});

UserSchema.index({ email: 1 }, { unique: true });

User = mongoose.model("users", UserSchema);
module.exports = User;
