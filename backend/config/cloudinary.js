const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dzeoyfozh',
    api_key: '588613697238184',
    api_secret: 'kW3WCJonj2F2VoAFwHPoz7ucnXY'
});

module.exports = cloudinary;