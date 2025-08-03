const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputFolder = path.join(__dirname, "outputs");
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

const executeCpp = async (filePath, inputFilePath) => {
    const outputId = path.basename(filePath).split(".")[0];
    const outputPath = path.join(outputFolder, `${outputId}.out`);


    return new Promise((resolve, reject) => {
        // Compile: same for Linux (as long as you use g++)
        exec(`g++ "${filePath}" -o "${outputPath}"`, (err, stdout, stderr) => {
            if (err) return reject({ err, stderr });

            // Run the binary: No cmd /c, just use the Linux path!
            // Use 'sh -c' to support input redirection
            exec(`sh -c '"${outputPath}" < "${inputFilePath}"'`, (runErr, runStdout, runStderr) => {
                if (runErr) return reject({ runErr, runStderr });
                resolve(runStdout);
            });
        });
    });

};

module.exports = executeCpp;
