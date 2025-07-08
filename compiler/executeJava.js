const path = require('path');
const { exec } = require('child_process');

const executeJava = async (filePath) => {
    const className = path.basename(filePath, '.java'); // Get class name = file name
    const dir = path.dirname(filePath);

    return new Promise((resolve, reject) => {
        const compileCommand = `javac "${filePath}"`;
        const runCommand = `cmd /c "cd /d ${dir} && java ${className}"`;

        exec(compileCommand, (compileErr, _, compileStderr) => {
            if (compileErr) return reject({ error: compileErr, stderr: compileStderr });

            exec(runCommand, (runErr, runStdout, runStderr) => {
                if (runErr) return reject({ error: runErr, stderr: runStderr });
                resolve(runStdout);
            });
        });
    });
};

module.exports = executeJava;
