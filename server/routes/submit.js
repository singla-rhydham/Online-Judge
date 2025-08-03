const express = require('express');
const router = express.Router();
const axios = require('axios');
const Problem = require('../models/problem.js');
const Submission = require('../models/submission.js');

router.post('/', async (req, res) => {
    const { code, language, problemId, userId } = req.body;

    try {
        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({ success: false, message: 'Problem not found' });
        }

        const { hiddenTestCases, hiddenOutputs } = problem;

        let status = 'Accepted';

        for (let i = 0; i < hiddenTestCases.length; i++) {
            const input = hiddenTestCases[i];
            const expected = hiddenOutputs[i];

            const payload = {
                code,
                language,
                input
            };

            const response = await axios.post('http://54.80.126.183:8000/run', payload);
            const output = (response.data.output || '').trim();

            if (output !== expected.trim()) {
                status = 'Wrong Answer';
                break;
            }
        }

        await Submission.create({
            userId,
            problemId,
            language,
            code,
            status
        });

        res.json({
            success: status === 'Accepted',
            message: status
        });
    } catch (err) {
        console.error('Error in /submit:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
