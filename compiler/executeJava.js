const path = require('path');
const { exec } = require('child_process');

const executeJava = async (filePath, inputFilePath) => {
    const className = path.basename(filePath, '.java'); // Get class name = file name
    const dir = path.dirname(filePath);

    return new Promise((resolve, reject) => {
        const compileCommand = `javac "${filePath}"`;
        const runCommand = `cmd /c "cd /d ${dir} && java ${className}" < "${inputFilePath}"`;

        exec(compileCommand, (compileErr, _, compileStderr) => {
            if (compileErr) return reject({ error: compileErr, stderr: compileStderr });

            exec(runCommand, (runErr, runStdout, runStderr) => {
                if (runErr) return reject({ error: runErr, stderr: runStderr });
                resolve(runStdout.replace(/\r?\n/g, '').trim());
            });
        });
    });
};

module.exports = executeJava;
