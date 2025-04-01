/**
 * This script standardizes meta.json files by ensuring they have proper sidebar tabs.
 * 
 * Usage: node standardize-meta.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Standard sidebar tabs template
const STANDARD_SIDEBAR_TABS = [
  {
    "id": "solver",
    "label": "Solver",
    "icon": "🧮",
    "color": {
      "active": "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300",
      "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
    }
  },
  {
    "id": "explanation",
    "label": "Learn",
    "icon": "📖",
    "color": {
      "active": "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300",
      "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
    }
  },
  {
    "id": "applications",
    "label": "Uses",
    "icon": "💡",
    "color": {
      "active": "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300",
      "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
    }
  },
  {
    "id": "resources",
    "label": "Resources",
    "icon": "📚",
    "color": {
      "active": "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300",
      "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
    }
  }
];

const APP_DIR = path.join(__dirname, '..', 'src', 'app');

// Find all meta.json files in the app directory
const findMetaFiles = () => {
  try {
    const cmd = `find ${APP_DIR} -name "meta.json" | grep -v node_modules`;
    const output = execSync(cmd).toString();
    return output.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding meta.json files:', error);
    return [];
  }
};

// Standardize a meta.json file
const standardizeMeta = (metaFilePath) => {
  try {
    // Read the current meta.json
    const metaContent = fs.readFileSync(metaFilePath, 'utf-8');
    const meta = JSON.parse(metaContent);
    
    // Check if sidebar and tabs exist
    if (!meta.sidebar) {
      meta.sidebar = { tabs: STANDARD_SIDEBAR_TABS };
    } else if (!meta.sidebar.tabs || !Array.isArray(meta.sidebar.tabs) || meta.sidebar.tabs.length === 0) {
      meta.sidebar.tabs = STANDARD_SIDEBAR_TABS;
    } else if (meta.sidebar.tabs.length === 1) {
      // If only one tab exists, add the other standard tabs
      const existingTab = meta.sidebar.tabs[0];
      meta.sidebar.tabs = STANDARD_SIDEBAR_TABS.map(tab => 
        tab.id === existingTab.id ? existingTab : tab
      );
    }
    
    // Ensure meta has type field
    if (!meta.type) {
      // Infer type from path
      meta.type = metaFilePath.includes('/math/') ? 'math' : 'ai';
    }
    
    // Write the updated meta.json
    fs.writeFileSync(metaFilePath, JSON.stringify(meta, null, 2));
    console.log(`Standardized meta file: ${metaFilePath}`);
  } catch (error) {
    console.error(`Error standardizing meta file ${metaFilePath}:`, error);
  }
};

// Process all meta.json files
const processMetaFiles = () => {
  const metaFiles = findMetaFiles();
  console.log(`Found ${metaFiles.length} meta.json files`);
  
  metaFiles.forEach(standardizeMeta);
};

// Run the script
processMetaFiles(); 