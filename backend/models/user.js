const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    imageUrl: { type: String, required: false }
});

module.exports = mongoose.model('User', UserSchema);
