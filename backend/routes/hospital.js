const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const HospitalRegistration = require('../models/hospitalRegistration');

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'hospital-images',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

const upload = multer({ storage: storage });

// Route to handle hospital registration with image upload
router.post('/register-hospital', upload.single('image'), async (req, res) => {
    try {
        const { name, address, contact, email, about, lattitude, longitude } = req.body;
        const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

        const newHospital = new HospitalRegistration({
            name,
            address,
            contact,
            email,
            about,
            lattitude,
            longitude,
            imageUrl  // Save the Cloudinary URL
        });

        await newHospital.save();
        res.send('Hospital registration request sent');
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging
        res.status(500).send(`Error saving hospital request: ${err.message || err}`);
    }
});

module.exports = router;
