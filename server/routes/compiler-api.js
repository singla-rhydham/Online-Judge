const express = require('express');
const axios = require('axios');
const router = express.Router();

const COMPILER_URL = process.env.COMPILER_URL ; 

router.post('/run', async (req, res) => {
  try {
    const response = await axios.post(`${COMPILER_URL}/run`, req.body);
    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).send(err.response?.data || { error: 'Compiler server error' });
  }
});

// router.post('/submit', async (req, res) => {
//   try {
//     const response = await axios.post(`${COMPILER_URL}/submit`, req.body);
//     res.status(response.status).send(response.data);
//   } catch (err) {
//     res.status(err.response?.status || 500).send(err.response?.data || { error: 'Compiler server error' });
//   }
// });

module.exports = router;
