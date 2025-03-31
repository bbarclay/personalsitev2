#!/usr/bin/env node

/**
 * This script standardizes all meta.json files across the codebase.
 * It ensures that all meta files have the required properties and
 * consistent structure for the sidebar tabs.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Main directories to search for meta.json files
const directories = [
  'src/app/math',
  'src/app/ai'
];

// Default sidebar tabs structure
const DEFAULT_TABS = [
  {
    id: 'solver',
    label: 'Solver',
    icon: '🧮',
    color: {
      active: 'bg-blue-500 text-white',
      hover: 'bg-blue-100 dark:bg-blue-900'
    }
  },
  {
    id: 'explanation',
    label: 'Explanation',
    icon: '📚',
    color: {
      active: 'bg-purple-500 text-white',
      hover: 'bg-purple-100 dark:bg-purple-900'
    }
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: '🔧',
    color: {
      active: 'bg-green-500 text-white',
      hover: 'bg-green-100 dark:bg-green-900'
    }
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '📖',
    color: {
      active: 'bg-orange-500 text-white',
      hover: 'bg-orange-100 dark:bg-orange-900'
    }
  }
];

// Component name mapping for tab IDs
const TAB_COMPONENT_MAP = {
  'solver': 'SolverPanel',
  'calculator': 'SolverPanel', // Alias
  'explanation': 'ExplanationPanel',
  'applications': 'ApplicationsPanel',
  'resources': 'ResourcesPanel',
  'visualProof': 'VisualProofPanel',
  'triples': 'TriplesPanel'
};

// Find all meta.json files in the specified directories
function findMetaFiles() {
  let allFiles = [];
  directories.forEach(dir => {
    const files = glob.sync(`${dir}/**/meta.json`);
    allFiles = allFiles.concat(files);
  });
  return allFiles;
}

// Check if a component file exists in the components directory
function doesComponentExist(toolDir, componentName) {
  const componentsDir = path.join(toolDir, 'components');
  if (!fs.existsSync(componentsDir)) {
    return false;
  }
  
  // Check for exact file match
  const exactPath = path.join(componentsDir, `${componentName}.tsx`);
  if (fs.existsSync(exactPath)) {
    return true;
  }
  
  // Check for index file in subdirectory
  const indexPath = path.join(componentsDir, componentName, 'index.tsx');
  if (fs.existsSync(indexPath)) {
    return true;
  }
  
  return false;
}

// Get available tabs based on component files
function getAvailableTabs(metaFilePath) {
  const toolDir = path.dirname(metaFilePath);
  const availableTabs = {};
  
  // Check which default components exist
  for (const [tabId, componentName] of Object.entries(TAB_COMPONENT_MAP)) {
    if (doesComponentExist(toolDir, componentName)) {
      availableTabs[tabId] = true;
    }
  }
  
  return availableTabs;
}

// Standardize a meta.json file
function standardizeMetaFile(filePath) {
  console.log(`Standardizing: ${filePath}`);
  
  try {
    // Read the meta.json file
    const metaJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Get tool ID from directory path if not set
    if (!metaJson.id) {
      const dirName = path.basename(path.dirname(filePath));
      metaJson.id = dirName;
      console.log(`  Added missing id: ${dirName}`);
    }

    // Ensure title is set
    if (!metaJson.title) {
      metaJson.title = metaJson.id.charAt(0).toUpperCase() + metaJson.id.slice(1).replace(/-/g, ' ');
      console.log(`  Added missing title: ${metaJson.title}`);
    }

    // Ensure description is set
    if (!metaJson.description) {
      metaJson.description = `${metaJson.title} tool`;
      console.log(`  Added missing description`);
    }

    // Ensure category is set
    if (!metaJson.category) {
      metaJson.category = metaJson.id.includes('ai') ? 'AI' : 'Math';
      console.log(`  Added missing category: ${metaJson.category}`);
    }

    // Ensure type is set
    if (!metaJson.type) {
      metaJson.type = metaJson.id.includes('ai') ? 'ai' : 'math';
      console.log(`  Added missing type: ${metaJson.type}`);
    }

    // Ensure difficulty is set
    if (!metaJson.difficulty) {
      metaJson.difficulty = 'intermediate';
      console.log(`  Added missing difficulty: ${metaJson.difficulty}`);
    }

    // Ensure lastUpdated is set
    if (!metaJson.lastUpdated) {
      metaJson.lastUpdated = new Date().toISOString().split('T')[0];
      console.log(`  Added missing lastUpdated: ${metaJson.lastUpdated}`);
    }

    // Ensure icon is set
    if (!metaJson.icon) {
      metaJson.icon = metaJson.type === 'ai' ? '🤖' : '🧮';
      console.log(`  Added missing icon: ${metaJson.icon}`);
    }

    // Ensure color is set
    if (!metaJson.color) {
      metaJson.color = metaJson.type === 'ai' 
        ? 'from-orange-500 to-pink-500' 
        : 'from-blue-500 to-purple-500';
      console.log(`  Added missing color: ${metaJson.color}`);
    }

    // Convert color object to string if needed
    if (typeof metaJson.color === 'object' && metaJson.color.gradient) {
      metaJson.color = metaJson.color.gradient;
      console.log(`  Converted color object to string: ${metaJson.color}`);
    }

    // Ensure enabled is set
    if (metaJson.enabled === undefined) {
      metaJson.enabled = true;
      console.log(`  Added missing enabled: ${metaJson.enabled}`);
    }

    // Ensure tags are set
    if (!metaJson.tags || !Array.isArray(metaJson.tags) || metaJson.tags.length === 0) {
      metaJson.tags = [metaJson.id, metaJson.category.toLowerCase()];
      console.log(`  Added missing tags: ${metaJson.tags.join(', ')}`);
    }

    // Ensure keywords are set
    if (!metaJson.keywords || !Array.isArray(metaJson.keywords) || metaJson.keywords.length === 0) {
      metaJson.keywords = [...metaJson.tags];
      console.log(`  Added missing keywords: ${metaJson.keywords.join(', ')}`);
    }

    // Check for available components
    const availableTabs = getAvailableTabs(filePath);
    
    // Ensure sidebar is set with proper tabs
    if (!metaJson.sidebar || !metaJson.sidebar.tabs || !Array.isArray(metaJson.sidebar.tabs)) {
      // Only include tabs for which components exist
      const filteredTabs = DEFAULT_TABS.filter(tab => availableTabs[tab.id]);
      
      // Always include at least one tab even if no components exist
      metaJson.sidebar = { 
        tabs: filteredTabs.length > 0 ? filteredTabs : [DEFAULT_TABS[0]] 
      };
      console.log(`  Added sidebar with ${metaJson.sidebar.tabs.length} available tabs`);
    } else {
      // Filter existing tabs to only those with components
      let existingTabs = metaJson.sidebar.tabs;
      
      // Normalize "calculator" to "solver"
      existingTabs = existingTabs.map(tab => {
        if (tab.id === 'calculator') {
          tab.id = 'solver';
          if (tab.label === 'Calculator') {
            tab.label = 'Solver';
          }
          console.log(`  Converted calculator tab to solver`);
        }
        return tab;
      });
      
      // Check each tab to ensure it has all required properties
      metaJson.sidebar.tabs = existingTabs
        .filter(tab => {
          // Keep the tab if the component exists or if it's already been included
          const shouldKeep = availableTabs[tab.id];
          if (!shouldKeep) {
            console.log(`  Removed tab ${tab.id} because component doesn't exist`);
          }
          return shouldKeep;
        })
        .map((tab, index) => {
          const defaultTab = DEFAULT_TABS[index % DEFAULT_TABS.length] || DEFAULT_TABS[0];
          
          // Ensure tab has an id
          if (!tab.id) {
            tab.id = defaultTab.id;
            console.log(`  Added missing tab id: ${tab.id}`);
          }
          
          // Ensure tab has a label
          if (!tab.label) {
            tab.label = defaultTab.label;
            console.log(`  Added missing tab label: ${tab.label}`);
          }
          
          // Ensure tab has an icon
          if (!tab.icon) {
            tab.icon = defaultTab.icon;
            console.log(`  Added missing tab icon: ${tab.icon}`);
          }
          
          // Ensure tab has color properties
          if (!tab.color) {
            tab.color = { ...defaultTab.color };
            console.log(`  Added missing tab color`);
          } else {
            // Ensure color has active property
            if (!tab.color.active) {
              tab.color.active = defaultTab.color.active;
              console.log(`  Added missing tab color.active`);
            }
            
            // Ensure color has hover property
            if (!tab.color.hover) {
              tab.color.hover = defaultTab.color.hover;
              console.log(`  Added missing tab color.hover`);
            }
          }
          
          return tab;
        });
      
      // If no tabs remain after filtering, add the default solver tab
      if (metaJson.sidebar.tabs.length === 0) {
        metaJson.sidebar.tabs = [DEFAULT_TABS[0]];
        console.log(`  No valid tabs found, using default solver tab`);
      }
    }

    // Ensure navigation is set
    if (!metaJson.navigation) {
      metaJson.navigation = {
        category: {
          title: metaJson.category,
          path: `/${metaJson.type.toLowerCase()}`
        }
      };
      console.log(`  Added missing navigation`);
    } else if (!metaJson.navigation.category) {
      metaJson.navigation.category = {
        title: metaJson.category,
        path: `/${metaJson.type.toLowerCase()}`
      };
      console.log(`  Added missing navigation.category`);
    }

    // Write the updated meta.json back to the file
    fs.writeFileSync(filePath, JSON.stringify(metaJson, null, 2), 'utf8');
    console.log(`  Updated: ${filePath}`);
  } catch (error) {
    console.error(`  Error updating ${filePath}:`, error);
  }
}

// Main function
function main() {
  const metaFiles = findMetaFiles();
  console.log(`Found ${metaFiles.length} meta.json files to standardize.`);
  
  metaFiles.forEach(filePath => {
    standardizeMetaFile(filePath);
  });
  
  console.log('Done standardizing meta.json files.');
}

// Run the script
main(); 