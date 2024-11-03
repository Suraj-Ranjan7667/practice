const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const bcrypt = require('bcrypt');

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user-images',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

const upload = multer({ storage: storage });

router.get('/hospitals',  async (req, res) => {

  
    try {
      const hospitals = await Hospital.find();
      res.json(hospitals);
    } catch (err) {
      res.status(500).send('Error fetching hospitals');
    }
  });

// Register user with image upload
router.post('/register-user', upload.single('image'), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        }

        const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            imageUrl
        });

        await newUser.save();
        res.json({ 
            message: 'User registration successful',
            user: newUser
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// User login route
// User login route
router.post('/login-user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Store user information in session
        req.session.userId = user._id; // or any other user information you want to store
        req.session.userName = user.name; // Example to store the user's name

        // Successful login
        res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email,image: user.imageUrl } });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});
router.post('/logout-user', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out.' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
