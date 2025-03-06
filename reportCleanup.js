const fs = require('fs');
const path = require('path');

/**
 * Cleans up old reports to maintain a maximum count
 * @param {number} maxCount - Maximum number of reports to keep
 * @param {string} reportsDir - Directory path where reports are stored
 * @returns {Promise<boolean>} - Promise resolving to success status
 */
function cleanupReports(maxCount, reportsDir) {
  return new Promise((resolve) => {
    try {
      if (!fs.existsSync(reportsDir)) {
        console.log('Reports directory does not exist. Creating it...');
        fs.mkdirSync(reportsDir, { recursive: true });
        return resolve(true);
      }
      
      const files = fs.readdirSync(reportsDir);
      
      // Get file stats and sort by creation date (newest first)
      const fileStats = files.map(file => {
        const filePath = path.join(reportsDir, file);
        const stats = fs.statSync(filePath);
        return {
          path: filePath,
          name: file,
          createdAt: stats.birthtime
        };
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      if (fileStats.length <= maxCount) {
        console.log(`Current report count (${fileStats.length}) doesn't exceed max (${maxCount})`);
        return resolve(true);
      }
      
      // Get reports to delete (keeping the newest maxCount reports)
      const reportsToDelete = fileStats.slice(maxCount);
      
      console.log(`Deleting ${reportsToDelete.length} old reports to maintain max of ${maxCount}`);
      
      // Delete older reports
      reportsToDelete.forEach(report => {
        try {
          fs.unlinkSync(report.path);
          console.log(`Deleted report: ${report.name}`);
        } catch (err) {
          console.error(`Error deleting report at ${report.path}:`, err);
        }
      });
      
      resolve(true);
    } catch (err) {
      console.error('Error during report cleanup:', err);
      resolve(false);
    }
  });
}

module.exports = {
  cleanupReports
};