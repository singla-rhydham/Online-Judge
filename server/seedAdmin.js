const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.js'); 
require('dotenv').config();

async function createAdmin() {
    await mongoose.connect(process.env.MONGODB_URL);

    const plainPassword = process.env.ADMIN_PASSWORD;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const adminUser = new User({
        firstName: 'Rhydham',
        lastName: 'Singla',
        email: 'singlarhydham2004@gmail.com',
        userName: 'admin',
        password: hashedPassword,
        isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
    mongoose.disconnect();
}

createAdmin();
