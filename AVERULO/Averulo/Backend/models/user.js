const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  verified: { type: Boolean, default: false },
  idImage: String
});

module.exports = mongoose.model('User', userSchema);