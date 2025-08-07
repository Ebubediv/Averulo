const bcrypt = require('bcryptjs');
const User = require('./models/User');
const sendOtp = require('../utils/sendOtp');
const fs = require('fs');

exports.signup = async (req, res) => {
  try {
    const { fullName, dob, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const user = new User({ fullName, dob, email, password: hashedPassword, otp });
    await user.save();
    await sendOtp(email, otp);

    res.json({ message: 'OTP sent to email', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.otp === otp) {
    user.verified = true;
    user.otp = null;
    await user.save();
    res.json({ message: 'User verified' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

exports.uploadID = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.idImage = req.file.path;
  await user.save();

  res.json({ message: 'ID uploaded successfully' });
};