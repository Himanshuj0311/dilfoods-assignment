const express = require('express');
const Otp = require('../models/Otp');
const User = require('../models/User');
const sendOtp = require('../utils/sendOtp');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Generate and Send OTP
router.post('/generate', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to the database
    await Otp.create({ email, otp });

    // Send OTP to email
    await sendOtp(email, otp);

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate OTP and Login
router.post('/validate', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find OTP in the database
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid or expired OTP' });

    // Generate JWT token
    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Delete OTP record after validation
    await Otp.deleteOne({ email, otp });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
