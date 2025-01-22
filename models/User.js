const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hash this in production
  role: { type: String, enum: ['Admin', 'User'], default: 'User' }
});

module.exports = mongoose.model('User', userSchema);