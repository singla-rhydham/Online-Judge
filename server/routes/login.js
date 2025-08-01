const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const {userName, password} = req.body;
        if(!userName || !password) return res.status(400).json({message: "Please enter User name and password"});

        const user = await User.findOne({userName});
        if(!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password"});

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET,                  
            { expiresIn: '2d' }                     
        );

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // send only over HTTPS in production
            sameSite: 'Lax', // CSRF protection
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };
        
        return res.status(200)
            .cookie("token", token, cookieOptions)
            .json({
                success: true,
                message: "Login successful!",
                token: token
            })
        ; 


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Login error"});
    }
});

module.exports = router;
