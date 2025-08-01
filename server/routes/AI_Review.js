const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini with API key
const ai = new GoogleGenAI({apiKey: process.env.Gemini_API});

const generateAIResponse = async (code) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Go through the following code and provide details about potential issues. 
If there are no issues, give suggestions on how to improve code quality.
**Respond using valid Markdown syntax so the output is ready to render with React Markdown.**
For example, use \`\`\` for code blocks, lists for bullet points, and bold or italics for emphasis.

Here is the code to review:
\`\`\`
${code}
\`\`\`
`,
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "No AI output received.";
};


router.post('/', async (req, res) => {
    const code = req.body.code; 
    if (!code || code.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Empty Code"
        });
    }
    try {
        const ai_response = await generateAIResponse(code);
        res.json({
            success: true,
            ai_response
        });
    } catch (error) {
        console.error("Error in Review", error.message);
        res.status(500).json({ success: false, error: "AI service failed" });
    }
});

module.exports = router;
