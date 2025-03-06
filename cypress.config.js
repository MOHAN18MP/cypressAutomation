const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');  // Install dayjs: npm install dayjs
const formattedDate = dayjs().format('YYYY-MM-DD_HH-mm-ss');
const { defineConfig } = require('cypress');
const { cleanupReports } = require('./reportCleanup');

// Set your max report count here as a global configuration
const MAX_REPORTS = 5; // Adjust this number as needed

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Test Report',
    reportFilename: '[status]_'+formattedDate+'-test-report',
    embeddedScreenshots: true,
    overwrite: false, 
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports'
  },
  e2e: {
    testIsolation: false,
    specPattern: 'cypress/e2e/*.js', // Your test files pattern

    // Setting up Node Events for Custom Tasks
    setupNodeEvents(on, config) {
      // Configure reports directory (use the same one from reporterOptions)
      const reportsDir = path.join(__dirname, config.reporterOptions.reportDir);
      
      // IMPORTANT: Initialize Mochawesome reporter first
      require('cypress-mochawesome-reporter/plugin')(on, config);
      
      // Add our cleanup functionality without interfering with Mochawesome
      on('before:spec', async (spec) => {
        console.log('Running automatic report cleanup before spec execution...');
        await cleanupReports(MAX_REPORTS, reportsDir);
      });
      
      // Add tasks for manual report management if needed
      on('task', {
        manualCleanup(maxCount) {
          return cleanupReports(maxCount || MAX_REPORTS, reportsDir);
        }
      });
      
      return config;
    },
  },

  env: {
    environment: 'qa1' || 'qa2', // Environment variable, can switch between qa1/qa2
    maxReports: MAX_REPORTS // Make max reports available to tests
  },
});