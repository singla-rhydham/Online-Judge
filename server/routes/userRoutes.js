const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/:id/profile', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('solvedProblems.problemId') // Assuming you have a Problem model
      .lean();
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
