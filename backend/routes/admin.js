const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const adminConfig = require('../config/admin');
const HospitalRegistration = require('../models/hospitalRegistration');
const Hospital = require('../models/hospital');
const User = require('../models/user');  // Assuming you have a User model

// Secret key for JWT
const SECRET_KEY = 'your-secret-key';

// Helper function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, SECRET_KEY, { expiresIn: '1h' });
};

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === adminConfig.email && password === adminConfig.password) {
    const token = generateToken('admin-id', 'admin');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  res.status(200).send('Admin logged out');
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/pending-hospitals', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  try {
    const pendingHospitals = await HospitalRegistration.find();
    res.json(pendingHospitals);
  } catch (err) {
    console.error('Error fetching pending hospitals:', err);
    res.status(500).send('Error fetching pending hospitals');
  }
});

// Approve hospital registration
router.post('/approve-hospital/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  try {
    const hospitalId = req.params.id;
    const hospitalRequest = await HospitalRegistration.findById(hospitalId);

    if (!hospitalRequest) {
      return res.status(404).send('Hospital request not found');
    }

    const approvedHospital = new Hospital(hospitalRequest.toObject());
    await approvedHospital.save();
    await HospitalRegistration.findByIdAndDelete(hospitalId);

    res.send('Hospital approved and added to the main database');
  } catch (err) {
    res.status(500).send('Error approving hospital');
  }
});

// Endpoint to get all registered hospitals
router.get('/hospitals', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    res.status(500).send('Error fetching hospitals');
  }
});
/*
// User login
router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Unauthorized');
  }

  const token = generateToken(user._id, 'user');
  res.json({ token });
});

// User logout
router.post('/user/logout', (req, res) => {
  res.status(200).send('User logged out');
})*/

module.exports = router;
