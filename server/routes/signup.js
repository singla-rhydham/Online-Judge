const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


console.log('Reached Here');
router.post('/register', async (req, res) => {
    try {
        console.log('signup se hi');
        const {userName, firstName, lastName, email, password} = req.body;
        
        if(!userName) {
            return res.status(400).send("please enter an username");
        } if(!firstName) {
            return res.status(400).send("please enter a first name");
        } if(!lastName) {
            return res.status(400).send("please enter a last name");
        } if(!email) {
            return res.status(400).send("please enter an email");
        } if(!password) {
            return res.status(400).send("please enter a password");
        }
        
        const existingUser = await User.findOne({
            $or: [{ email }, { userName }]
        });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already in use" });
            }
            if (existingUser.userName === userName) {
                return res.status(400).json({ message: "Username already taken" });
            }
        }
        
        const hashedPassowrd = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassowrd
        });
    
        const token = jwt.sign({id: newUser._id, email}, process.env.JWT_SECRET,{
            expiresIn: '1h'
        }) ;
        newUser.token = token;
        await newUser.save();
        res.status(201).send("User registered successfully");
        //newUser.password = undefined;
        //return res.status(200).json({message: 'User created successfully', newUser});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error", details: error.message });
    }
})

module.exports = router;


