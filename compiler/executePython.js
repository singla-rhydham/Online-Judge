const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputFolder = path.join(__dirname, "outputs");
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

const executePython = async (filePath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        const command = `cmd /c "python "${filePath}" < "${inputFilePath}"`; 

        exec(command, (err, stdout, stderr) => {
            if (err) return reject({ error: err, stderr });
            if (stderr) return reject({ stderr });
            resolve(stdout.trim());
        });
    });
};

module.exports = executePython;

/*
const executePython = async (filePath, inputFilePath, input) => {
    return new Promise((resolve, reject) => {
        const command = `cmd /c "python "${filePath}""`;

        const varr = exec(command, (err, stdout, stderr) => {
            if (err) return reject({ error: err, stderr });
            if (stderr) return reject({ stderr });
            resolve(stdout.trim());
        });
        varr.stdin.write(input);
        varr.stdin.end();
    });
};
*/