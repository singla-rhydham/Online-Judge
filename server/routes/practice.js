const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
});

module.exports = router;