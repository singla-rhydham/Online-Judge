const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (language, code) => {
    const fileId = uuid();
    let fileName;

    if (language.toLowerCase() === 'python') {
        fileName = `${fileId}.py`;
    } else if (language.toLowerCase() === 'java') {
        fileName = `Main${fileId}.java`;
        code = code.replace(/public class \w+/, `public class Main${fileId}`);
    } else {
        fileName = `${fileId}.${language}`;
    }

    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = generateFile;
