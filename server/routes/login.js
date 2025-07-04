const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        console.log('Reached login');
        const {userName, password} = req.body;
        if(!userName || !password) return res.status(400).json({message: "Please enter User name and password"});

        const user = await User.findOne({userName});
        if(!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password"});

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
