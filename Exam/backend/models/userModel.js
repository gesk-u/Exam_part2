const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true, versionKey: false, toJSON: { virtuals: true } });

module.exports = mongoose.model("User", userSchema);
