const mongoose = require('mongoose');

const HospitalRegistrationSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    email: String,
    about: String,
    lattitude: String,
    longitude: String, 
    imageUrl: String  // Add image URL field
});

module.exports = mongoose.model('HospitalRegistration', HospitalRegistrationSchema);
