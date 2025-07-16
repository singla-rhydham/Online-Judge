const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Submission = require('../models/submission.js');
const authMiddleware = require('../middleWare/authMiddleware.js');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const submissions = await Submission.find({ userId }).populate('problemId');

        const solvedProblems = new Set(
            submissions.filter(sub => sub.status === 'Accepted').map(sub => sub.problemId._id.toString())
        );

        const user = await User.findById(userId);

        res.json({
            name: user.name,
            email: user.email,
            solvedCount: solvedProblems.size,
            submissions
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;