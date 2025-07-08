const express = require('express');
const router = express.Router();
const Problem = require('../models/problem'); 

router.post('/', async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.status(201).send('Problem saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
