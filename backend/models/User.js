const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserSchema = new mongoose.Schema({
  otp: { type: String },
otpExpires: { type: Date },

  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
});

// Password Hashing Middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
