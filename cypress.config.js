const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.js",
    
    // Enable Mochawesome reporter
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory for reports
      reportFilename: '[status]_[datetime]-test-report', // Custom naming for reports
      overwrite: false,  // Do not overwrite reports on each run
      html: true,  // Generate HTML report
      json: true,  // Generate JSON report for later merging
      timestamp: 'short' // Adds timestamp for better report organization
    },
    
    setupNodeEvents(on, config) {
      // Implement Mochawesome plugin to enable reporting
      require('cypress-mochawesome-reporter/plugin')(on);

      // Additional node event listeners can be added here
    },
  },

  env: {
    environment: 'qa1', // or 'qa2'
  }
});


// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     specPattern: "cypress/e2e/*.js",
//     reporter: "cypress-html-reporter",
//     reporterOptions: {
//       html: true,
//       overwrite: false,
//       toConsole: true,
//     },
//   },
//   env: {
//     environment: 'qa1', // or 'qa2'
//   },
// });



/* 
const { defineConfig } = require('cypress');
const fs = require('fs'); // Required to work with the file system

let runtimeData = {}; // Store data across tasks

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/*.js',
    setupNodeEvents(on, config) {
      // Register node event listeners, such as 'task'
      on('task', {
        setData({ k, v }) {
          runtimeData[k] = v; // Store key-value pair
          return runtimeData; // Return the updated runtimeData object
        },
        getData(k) {
          // Check if the key exists in runtimeData
          if (runtimeData.hasOwnProperty(k)) {
            return runtimeData[k];
          } else {
            return null; // Return null if the key doesn't exist
          }
        },
        getAllData() {
          // Return the entire runtimeData object, or null if empty
          if (Object.keys(runtimeData).length > 0) {
            return runtimeData;
          } else {
            return null;
          }
        },
        downloads(downloadspath) {
          // Verify file download by listing files in the directory
          return fs.readdirSync(downloadspath);
        },
        getReportFileNames() {
          // List files in the 'cypress/results/my-test-output' directory
          const fileList = fs.readdirSync('cypress/results/my-test-output');
          if (fileList.length > 0) {
            return fileList; // Return the list of files
          } else {
            return null; // Return null if no files are found
          }
        }
      });

      // Return the Cypress configuration
      return config;
    }
  },
  env: {
    environment: 'qa1' // or 'qa2'
  }
});
 */