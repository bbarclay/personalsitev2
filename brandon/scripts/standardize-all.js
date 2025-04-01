/**
 * Master standardization script that runs all the standardization tools 
 * in the correct order.
 * 
 * Usage: node standardize-all.js
 */

const { execSync } = require('child_process');
const path = require('path');

// Get the path to the scripts directory
const scriptsDir = __dirname;

console.log('Starting full standardization process...');

// Function to run a script and log output
function runScript(scriptName) {
  console.log(`\n===== Running ${scriptName} =====`);
  try {
    const scriptPath = path.join(scriptsDir, scriptName);
    const output = execSync(`node ${scriptPath}`, { encoding: 'utf-8' });
    console.log(output);
    console.log(`✅ Successfully completed ${scriptName}`);
    return true;
  } catch (error) {
    console.error(`❌ Error running ${scriptName}:`, error.message);
    return false;
  }
}

// Step 1: Standardize metadata 
const metaSuccess = runScript('standardize-meta.js');

// Step 2: Enhance sidebar tabs
const sidebarSuccess = runScript('enhance-sidebars.js');

// Step 3: Create layout files
const layoutSuccess = runScript('standardize-pages.js');

// Step 4: Auto-standardize page files
const pageSuccess = runScript('auto-standardize-pages.js');

// Report results
console.log('\n===== Standardization Process Complete =====');
console.log(`Meta standardization: ${metaSuccess ? '✅ Success' : '❌ Failed'}`);
console.log(`Sidebar enhancement: ${sidebarSuccess ? '✅ Success' : '❌ Failed'}`);
console.log(`Layout standardization: ${layoutSuccess ? '✅ Success' : '❌ Failed'}`);
console.log(`Page auto-standardization: ${pageSuccess ? '✅ Success' : '❌ Failed'}`);

console.log('\nNext Steps:');
console.log('1. Check for any pages that could not be auto-standardized');
console.log('2. Manually standardize any remaining pages');
console.log('3. Test all pages to ensure they work correctly');
console.log('4. Commit changes to version control');

// Instructions for running the app
console.log('\nTo test the standardized app, run:');
console.log('npm run dev'); 