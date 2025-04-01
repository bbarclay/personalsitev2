#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of directories to check
const dirsToCheck = [
  'src/app/math/bonus-game/components',
  'src/app/math/factorial-calculator/components',
  'src/app/math/paytable/components',
  'src/app/math/probability-simulator/components',
  'src/app/math/slot-machine-header/components',
  'src/app/math/statistics-analyzer/components',
  'src/app/math/symbol-icon/components',
  'src/app/math/win-ledger/components'
];

// Fix the exports in the index.tsx or MainComponent.tsx file
function fixExportsInFile(filePath) {
  console.log(`Checking ${filePath}`);
  
  try {
    // Read the file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if it already has a default export
    if (content.includes('export default ')) {
      console.log(`  ${filePath} already has a default export.`);
      return false;
    }
    
    // Find component name - look for either const ComponentName or export const ComponentName
    let componentNameMatch;
    
    // Try to find "export const ComponentName"
    componentNameMatch = content.match(/export\s+const\s+([A-Za-z0-9_]+)\s*=/);
    
    // If not found, try to find "const ComponentName"
    if (!componentNameMatch) {
      componentNameMatch = content.match(/const\s+([A-Za-z0-9_]+)\s*=/);
    }
    
    if (!componentNameMatch) {
      console.log(`  Couldn't find component name in ${filePath}`);
      return false;
    }
    
    const componentName = componentNameMatch[1];
    console.log(`  Found component ${componentName}`);
    
    // Add default export at the end of the file
    const updatedContent = content + `\n\nexport default ${componentName};\n`;
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    
    console.log(`  Added default export for ${componentName} in ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  let fixedCount = 0;
  
  for (const dir of dirsToCheck) {
    const dirPath = path.join(__dirname, '..', dir);
    
    try {
      // Check if directory exists
      if (!fs.existsSync(dirPath)) {
        console.log(`Directory ${dirPath} does not exist. Skipping.`);
        continue;
      }
      
      // Check for index.tsx
      const indexPath = path.join(dirPath, 'index.tsx');
      if (fs.existsSync(indexPath)) {
        if (fixExportsInFile(indexPath)) {
          fixedCount++;
        }
        continue;
      }
      
      // Check for MainComponent.tsx
      const mainComponentPath = path.join(dirPath, 'MainComponent.tsx');
      if (fs.existsSync(mainComponentPath)) {
        if (fixExportsInFile(mainComponentPath)) {
          fixedCount++;
        }
        continue;
      }
      
      console.log(`No index.tsx or MainComponent.tsx found in ${dirPath}`);
    } catch (error) {
      console.error(`Error processing directory ${dirPath}:`, error);
    }
  }
  
  console.log(`Fixed exports in ${fixedCount} files.`);
}

main(); 