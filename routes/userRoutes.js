const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing
const router = express.Router();
require('dotenv').config();

// User Registration
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).send('User  registered');
});

// User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Compare the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Invalid credentials');
  }

  const payload= { id: user._id, role: user.role }
  console.log(payload);

  // Generate JWT token
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;