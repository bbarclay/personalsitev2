#!/usr/bin/env node

/**
 * This script updates all tool pages to use the refactored ToolPageLayout
 * which is more robust against missing properties and uses smaller component structure.
 * 
 * Usage:
 * node scripts/fix-tool-layouts.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all meta.json files without sidebar property
function findMetaFilesWithoutSidebar() {
  const metaFiles = glob.sync(path.join(__dirname, '../src/app/**/**/meta.json'));
  const filesWithoutSidebar = [];
  
  metaFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const meta = JSON.parse(content);
      
      if (!meta.sidebar) {
        filesWithoutSidebar.push(filePath);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  });
  
  return filesWithoutSidebar;
}

// Add default sidebar structure to meta.json
function addSidebarToMetaFiles(metaFiles) {
  const defaultSidebar = {
    tabs: [
      {
        id: 'solver',
        label: 'Solver',
        icon: '🧮',
        color: {
          active: 'text-blue-600 dark:text-blue-400',
          hover: 'text-blue-500'
        }
      },
      {
        id: 'explanation',
        label: 'Learn',
        icon: '📚',
        color: {
          active: 'text-green-600 dark:text-green-400',
          hover: 'text-green-500'
        }
      },
      {
        id: 'applications',
        label: 'Uses',
        icon: '🔧',
        color: {
          active: 'text-purple-600 dark:text-purple-400',
          hover: 'text-purple-500'
        }
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: '📖',
        color: {
          active: 'text-orange-600 dark:text-orange-400',
          hover: 'text-orange-500'
        }
      }
    ]
  };
  
  metaFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const meta = JSON.parse(content);
      
      meta.sidebar = defaultSidebar;
      
      fs.writeFileSync(filePath, JSON.stringify(meta, null, 2), 'utf8');
      console.log(`✅ Added sidebar to: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error);
    }
  });
}

// Update page files to use refactored components
function updatePageFiles() {
  const pageFiles = glob.sync(path.join(__dirname, '../src/app/**/**/page.tsx'));
  
  pageFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Skip if already using the new property name
      if (content.includes('metadata={toolMetadata}')) {
        console.log(`✅ Already updated: ${filePath}`);
        return;
      }
      
      // Update parameter name for ToolPageLayout
      let updatedContent = content.replace(
        /meta={toolMetadata}/g, 
        'metadata={toolMetadata}'
      );
      
      updatedContent = updatedContent.replace(
        /meta={meta}/g, 
        'metadata={meta}'
      );
      
      // Update children prop to content
      updatedContent = updatedContent.replace(
        /children={/g, 
        'content={'
      );
      
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Updated page: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error);
    }
  });
}

// Main function
function main() {
  console.log('🔍 Finding meta.json files without sidebar property...');
  const metaFilesWithoutSidebar = findMetaFilesWithoutSidebar();
  
  console.log(`Found ${metaFilesWithoutSidebar.length} meta files without sidebar.`);
  
  if (metaFilesWithoutSidebar.length > 0) {
    console.log('📝 Adding sidebar to meta files...');
    addSidebarToMetaFiles(metaFilesWithoutSidebar);
  }
  
  console.log('🔄 Updating page files...');
  updatePageFiles();
  
  console.log('✨ Done!');
}

main(); 