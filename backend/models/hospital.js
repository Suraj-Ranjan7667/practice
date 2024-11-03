const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    email: String,
    about: String,
    lattitude: String,
    longitude: String,
    imageUrl: { type: String, required: false } // Add this field for the image URL
});

module.exports = mongoose.model('Hospital', HospitalSchema);
