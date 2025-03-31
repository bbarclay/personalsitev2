#!/usr/bin/env node

/**
 * This script updates all tool pages to use the standardized meta format and layout structure.
 * It fixes:
 * 1. Changes 'metadata' prop to 'meta'
 * 2. Changes 'content' prop to children
 * 3. Updates imports from '@/types/tool' to '@/types/tool-types'
 * 4. Updates the page structure to use createDynamicPanelComponent
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Main directories to search for tool pages
const directories = [
  'src/app/math',
  'src/app/ai'
];

// Find all page.tsx files in the specified directories
function findToolPages() {
  let allFiles = [];
  directories.forEach(dir => {
    const files = glob.sync(`${dir}/**/page.tsx`);
    allFiles = allFiles.concat(files);
  });
  return allFiles;
}

// Update imports
function updateImports(content) {
  // Replace old tool-types import
  content = content.replace(
    /import\s+\{\s*ToolMetadata\s*\}\s+from\s+['"]@\/types\/tool['"]/g,
    `import { ToolMeta, ToolComponentProps, DEFAULT_SIDEBAR_TABS } from '@/types/tool-types'`
  );

  // Update ToolPageLayout import
  content = content.replace(
    /import\s+\{\s*ToolPageLayout\s*\}\s+from\s+['"]@\/components\/layouts\/ToolPageLayout['"]/g,
    `import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout'`
  );

  // Remove withActiveTab import if it exists
  content = content.replace(
    /import\s+\{\s*withActiveTab\s*\}\s+from\s+['"]@\/components\/hoc\/withActiveTab['"]\s*;\s*/g,
    ''
  );

  // Remove DynamicPanelRenderer import if it exists
  content = content.replace(
    /import\s+\{\s*DynamicPanelRenderer\s*\}\s+from\s+['"]@\/components\/layouts\/DynamicPanelRenderer['"]\s*;\s*/g,
    ''
  );

  return content;
}

// Update metadata references
function updateMetadataReferences(content) {
  // Update type annotations
  content = content.replace(/toolMetadata\s+as\s+ToolMetadata/g, 'meta: ToolMeta');
  content = content.replace(/const\s+toolMetadata\s*=\s*metadata/g, 'const meta');
  
  // Update metadata references
  content = content.replace(/metadata\s*=\s*\{\s*toolMetadata\s*\}/g, 'meta={meta}');
  
  // Update content prop to children
  content = content.replace(/content\s*=\s*\{\s*<(\w+)\s*\/>\s*\}/g, 'meta={meta}>\n      <$1 />\n    </ToolPageLayout');
  
  return content;
}

// Update component structure to use createDynamicPanelComponent
function updateComponentStructure(content) {
  // Look for panel mapping patterns
  const panelMapRegex = /const\s+panels\s*=\s*\{([^}]+)\}/;
  const panelMatch = content.match(panelMapRegex);
  
  if (panelMatch) {
    const panelMap = panelMatch[1];
    
    // Look for withActiveTab pattern
    const withActiveTabRegex = /const\s+(\w+)\s*=\s*withActiveTab\(\s*\(\s*\{\s*activeTab\s*\}\s*\)\s*=>\s*\{[\s\S]+?DynamicPanelRenderer[\s\S]+?\}\s*\)\s*;/;
    const componentMatch = content.match(withActiveTabRegex);
    
    if (componentMatch) {
      const componentName = componentMatch[1];
      
      // Create the new dynamic panel component
      const newComponent = `// Create dynamic panel component
const ${componentName} = createDynamicPanelComponent({${panelMap}
});`;
      
      // Replace the old component with the new one
      content = content.replace(withActiveTabRegex, newComponent);
    }
  }
  
  return content;
}

// Update a single file
function updateFile(filePath) {
  console.log(`Updating: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already using the new pattern
    if (content.includes('createDynamicPanelComponent') && !content.includes('metadata={toolMetadata}')) {
      console.log(`  Already updated: ${filePath}`);
      return;
    }
    
    // Apply updates
    content = updateImports(content);
    content = updateMetadataReferences(content);
    content = updateComponentStructure(content);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated: ${filePath}`);
  } catch (error) {
    console.error(`  Error updating ${filePath}:`, error);
  }
}

// Main function
function main() {
  const toolPages = findToolPages();
  console.log(`Found ${toolPages.length} tool pages to update.`);
  
  toolPages.forEach(filePath => {
    updateFile(filePath);
  });
  
  console.log('Done updating tool pages.');
}

// Run the script
main(); 