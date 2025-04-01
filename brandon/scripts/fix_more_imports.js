#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
  let wasModified = false;
  
  // Check if the file contains problematic imports
  if (content.includes('@components/math/')) {
    console.log(`Fixing @components/math/ imports in ${filePath}`);
    
    // Replace all occurrences of @components/math/ with @/components/math/
    const updatedContent = content.replace(/@components\/math\//g, '@/components/math/');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    
    wasModified = true;
  }
  
  // Check for relative paths that should be updated
  // Example: '../SymbolIcon' to '@/components/math/symbol-icon'
  content = fs.readFileSync(filePath, 'utf-8'); // Read again in case it was modified
  
  if (content.includes('../SymbolIcon')) {
    console.log(`Fixing relative SymbolIcon imports in ${filePath}`);
    
    const updatedContent = content.replace(/\.\.\/SymbolIcon/g, '@/components/math/symbol-icon');
    
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    
    wasModified = true;
  }
  
  return wasModified;
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