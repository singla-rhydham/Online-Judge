const express = require('express');
const generateFile = require('./generatefile.js');
const executeCpp = require('./executeCpp.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/run', async (req, res) => {
    const {language = 'cpp', code} = req.body;
    if(code === undefined) {
        return res.status(400).json({success: false, error: 'No code provided'})
    } 
    
    try {
        const filePath = generateFile(language, code);
        console.log(filePath);
        const output = await executeCpp(filePath);
        res.json({output});
    } catch (error) {
        res.status(500).json({success: false, error: 'Internal server error'});
    }
});

app.listen(8000, ()=>{
    console.log("listening on port");
})