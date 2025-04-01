#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to recursively find all files with a specific extension
function findFilesWithExtension(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFilesWithExtension(filePath, ext, fileList);
    } else if (path.extname(file) === ext) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Fix imports in the specified file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if the file contains problematic imports
  if (content.includes('@components/ui/')) {
    console.log(`Fixing imports in ${filePath}`);
    
    // Replace all occurrences of @components/ui/ with @/components/ui/
    const updatedContent = content.replace(/@components\/ui\//g, '@/components/ui/');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    
    return true; // Return true if the file was modified
  }
  
  return false; // Return false if the file was not modified
}

// Main function
function main() {
  const sourceDir = path.join(__dirname, '..', 'src');
  let modifiedFileCount = 0;
  
  // Find all TypeScript and TSX files
  const tsFiles = findFilesWithExtension(sourceDir, '.ts');
  const tsxFiles = findFilesWithExtension(sourceDir, '.tsx');
  const allFiles = [...tsFiles, ...tsxFiles];
  
  console.log(`Found ${allFiles.length} TypeScript files to process.`);
  
  // Process each file
  for (const file of allFiles) {
    if (fixImportsInFile(file)) {
      modifiedFileCount++;
    }
  }
  
  console.log(`Modified ${modifiedFileCount} files.`);
}

main(); 