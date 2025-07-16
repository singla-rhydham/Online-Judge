const express = require('express');
const generateFile = require('./generatefile.js');
const generateInputFile = require('./generateInputFile.js');
const cors  = require('cors');

const executeCpp = require('./executeCpp.js');
const executeJava = require('./executeJava.js');
const executePython = require('./executePython.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/run', async (req, res) => {
    const {language = 'cpp', code, input = ""} = req.body;

    if(code === undefined) {
        return res.status(400).json({success: false, error: 'No code provided'})
    } 
    
    try {
        const filePath = generateFile(language, code);
        const inputFilePath = generateInputFile(input);
        let output;
        if(language === 'cpp'){
            output = await executeCpp(filePath, inputFilePath);
        }
        else if (language === 'java') {
            output = await executeJava(filePath, inputFilePath);
        }
        else if (language === 'python') {
            output = await executePython(filePath, inputFilePath, input);
        }
        else {
            return res.status(400).json({success: false, error: 'Language not supported yet'});
        }

        return res.json({output});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, error: 'Internal server error'});
    }
});

app.listen(8000, ()=>{
    console.log("listening on port");
})