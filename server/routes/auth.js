const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    };

    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register (for admin use)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, department, designation, phone, recoveryEmail } = req.body;

    console.log('Register request received:', { name, email, role, department, designation, phone, recoveryEmail });

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role,
      department,
      designation,
      phone,
      recoveryEmail,
    });

    console.log('Saving user to database...');
    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser._id);

    const userData = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      department: savedUser.department,
      phone: savedUser.phone,
      recoveryEmail: savedUser.recoveryEmail,
    };

    res.status(201).json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
