// app.js
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const hospitalRoutes = require('./routes/hospital');
const userRoutes = require('./routes/user');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
mongoose.connect('mongodb+srv://surajranjan:<db_password>@shop-naksha.lwoe8.mongodb.net/Shop-Naksha?retryWrites=true&w=majority&appName=Shop-Naksha');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use('/admin', adminRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/user',userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
