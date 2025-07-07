const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputFolder = path.join(__dirname, "outputs");
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

const executeCpp = async (filePath) => {
    const outputId = path.basename(filePath).split(".")[0];
    const outputPath = path.join(outputFolder, `${outputId}.exe`);

    return new Promise((resolve, reject) => {
        exec(`g++ "${filePath}" -o "${outputPath}"`, (err, stdout, stderr) => {
            if (err) return reject({ err, stderr });

            exec(`cmd /c "${outputPath}"`, (runErr, runStdout, runStderr) => {
                if (runErr) return reject({ runErr, runStderr });
                resolve(runStdout);
            });
        });
    });
};

module.exports = executeCpp;
