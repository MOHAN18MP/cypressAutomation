const fs = require('fs');
const path = require('path');

/**
 * Logs errors to a file in the `logs` directory.
 * @param {string} errorMessage - The error message to log.
 * @param {string} testName - The name of the test where the error occurred.
 * @param {string} description - Additional description of the error.
 */
function logErrorToFile(errorMessage, testName, description) {
  const logDir = path.join(__dirname, '../../log');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFile = path.join(logDir, `${timestamp}-error-log.txt`);

  // Ensure the logs directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logContent = `
Timestamp: ${new Date().toISOString()}
Test Name: ${testName}
Description: ${description}
Error: ${errorMessage}

------------------------------------------
`;

  // Append the error message to the log file
  fs.appendFileSync(logFile, logContent, 'utf8');
}

module.exports = { logErrorToFile };
