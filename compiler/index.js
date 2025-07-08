const express = require('express');
const generateFile = require('./generatefile.js');
const executeCpp = require('./executeCpp.js');
const executeJava = require('./executeJava.js');
const executePython = require('./executePython.js');

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
        let output;
        if(language === 'cpp'){
            output = await executeCpp(filePath);
        }
        else if (language === 'java') {
            output = await executeJava(filePath);
        }
        else if (language === 'python') {
            output = await executePython(filePath);
        }
        else {
            return res.status(400).json({success: false, error: 'Language not supported yet'});
        }

        return res.json({output});
    } catch (error) {
        return res.status(500).json({success: false, error: 'Internal server error'});
    }
});

app.listen(8000, ()=>{
    console.log("listening on port");
})