const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirInputs = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = (input) => {
    const fileId = uuid();
    const inputFilename = `${fileId}.txt`;
    const inputFilepath = path.join(dirInputs, inputFilename);
    fs.writeFileSync(inputFilepath, input);
    return inputFilepath;
};

module.exports = generateInputFile;
