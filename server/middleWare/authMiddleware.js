const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    // console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // only runs when token is valid
    } catch (err) {
        console.error("JWT error:", err.message);
        return res.status(401).json({ message: 'Invalid token.', error: err.message });
    }
};


module.exports = authMiddleware;
