/**
 * This script enhances sidebar tabs in meta.json files to match our standardized format.
 * It ensures all tools have properly formatted tabs with consistent icons and labels.
 * 
 * Usage: node enhance-sidebars.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define mapping from tab IDs to standard tabs
const TAB_STANDARDS = {
  // Solver tab variations
  'solver': {
    label: 'Solver',
    icon: '🧮',
    color: {
      active: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'calculator': {
    label: 'Calculator',
    icon: '🧮',
    color: {
      active: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'create': {
    label: 'Create',
    icon: '✏️',
    color: {
      active: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },

  // Explanation tab variations
  'explanation': {
    label: 'Learn',
    icon: '📖',
    color: {
      active: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'learn': {
    label: 'Learn',
    icon: '📖',
    color: {
      active: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'theory': {
    label: 'Theory',
    icon: '📖',
    color: {
      active: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },

  // Applications tab variations
  'applications': {
    label: 'Uses',
    icon: '💡',
    color: {
      active: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'uses': {
    label: 'Uses',
    icon: '💡',
    color: {
      active: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'examples': {
    label: 'Examples',
    icon: '💡',
    color: {
      active: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },

  // Resources tab variations
  'resources': {
    label: 'Resources',
    icon: '📚',
    color: {
      active: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'library': {
    label: 'Library',
    icon: '📚',
    color: {
      active: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  'reference': {
    label: 'Reference',
    icon: '📚',
    color: {
      active: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  }
};

// Standard sidebar tabs template
const STANDARD_SIDEBAR_TABS = [
  {
    id: 'solver',
    label: 'Solver',
    icon: '🧮',
    color: {
      active: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  {
    id: 'explanation',
    label: 'Learn',
    icon: '📖',
    color: {
      active: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  {
    id: 'applications',
    label: 'Uses',
    icon: '💡',
    color: {
      active: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '📚',
    color: {
      active: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
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

// Enhance sidebar tabs in a meta.json file
const enhanceSidebars = (metaFilePath) => {
  try {
    // Read the current meta.json
    const metaContent = fs.readFileSync(metaFilePath, 'utf-8');
    const meta = JSON.parse(metaContent);
    
    // Check for existing sidebar.tabs
    if (!meta.sidebar || !meta.sidebar.tabs || !Array.isArray(meta.sidebar.tabs)) {
      // No sidebar tabs, add standard ones
      meta.sidebar = { tabs: STANDARD_SIDEBAR_TABS };
      console.log(`Added standard sidebar tabs to: ${metaFilePath}`);
    } else {
      const originalTabs = meta.sidebar.tabs;
      
      // Enhance existing tabs
      meta.sidebar.tabs = originalTabs.map(tab => {
        // Skip if tab has no id
        if (!tab.id) return tab;
        
        // Look up standard config for this tab id
        const standard = TAB_STANDARDS[tab.id];
        if (!standard) return tab;
        
        // Merge with standard, preserving custom values where they exist
        return {
          ...tab,
          label: tab.label || standard.label,
          icon: tab.icon || standard.icon,
          color: {
            active: tab.color?.active || standard.color.active,
            hover: tab.color?.hover || standard.color.hover
          }
        };
      });
      
      // Check if any tabs are missing from the standard set
      const tabIds = new Set(meta.sidebar.tabs.map(tab => tab.id));
      
      // Preserve custom tabs by checking against our standard IDs
      const standardIds = new Set(['solver', 'explanation', 'applications', 'resources']);
      
      // Find what standard tabs are missing
      const missingTabs = [...standardIds].filter(id => !tabIds.has(id));
      
      // Add missing standard tabs
      missingTabs.forEach(id => {
        const tab = STANDARD_SIDEBAR_TABS.find(t => t.id === id);
        if (tab) {
          meta.sidebar.tabs.push(tab);
        }
      });
      
      if (missingTabs.length > 0) {
        console.log(`Added missing tabs (${missingTabs.join(', ')}) to: ${metaFilePath}`);
      } else {
        console.log(`Enhanced existing tabs in: ${metaFilePath}`);
      }
    }
    
    // Sort tabs in standard order
    const standardOrder = ['solver', 'explanation', 'applications', 'resources'];
    meta.sidebar.tabs.sort((a, b) => {
      const aIdx = standardOrder.indexOf(a.id);
      const bIdx = standardOrder.indexOf(b.id);
      
      // Put standard tabs first
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      
      // For custom tabs, keep original order
      return 0;
    });
    
    // Write the updated meta.json
    fs.writeFileSync(metaFilePath, JSON.stringify(meta, null, 2));
  } catch (error) {
    console.error(`Error enhancing sidebar tabs in ${metaFilePath}:`, error);
  }
};

// Process all meta.json files
const processMetaFiles = () => {
  const metaFiles = findMetaFiles();
  console.log(`Found ${metaFiles.length} meta.json files`);
  
  metaFiles.forEach(enhanceSidebars);
};

// Run the script
processMetaFiles(); 