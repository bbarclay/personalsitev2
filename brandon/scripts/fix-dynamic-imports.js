/**
 * This script fixes broken dynamic imports in page.tsx files.
 * It standardizes the dynamic import syntax and ensures proper component structure.
 * 
 * Usage: node fix-dynamic-imports.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APP_DIR = path.join(__dirname, '..', 'src', 'app');

// Find all page.tsx files in the app directory
const findPageFiles = () => {
  try {
    const cmd = `find ${APP_DIR} -name "page.tsx" | grep -v node_modules`;
    const output = execSync(cmd).toString();
    return output.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding page.tsx files:', error);
    return [];
  }
};

// Check if a page has broken dynamic imports
const hasBrokenImports = (content) => {
  return content.includes('const \\w+ = dynamic((');
};

// Fix dynamic imports in a page file
const fixPageFile = (pagePath) => {
  if (!fs.existsSync(pagePath)) {
    console.log(`Page does not exist: ${pagePath}`);
    return;
  }

  try {
    // Read the current file
    const content = fs.readFileSync(pagePath, 'utf-8');

    if (!hasBrokenImports(content)) {
      console.log(`No broken imports found in: ${pagePath}`);
      return;
    }

    // Extract component names and paths
    const componentNames = content.match(/const\s+(\w+)\s*=\s*dynamic/g) || [];
    const importPaths = content.match(/import\(['"]\.\/components\/([^'"]+)['"]\)/g) || [];

    // Extract names
    const names = componentNames.map(line => {
      const match = line.match(/const\s+(\w+)/);
      return match ? match[1] : null;
    }).filter(Boolean);

    // Extract paths
    const paths = importPaths.map(line => {
      const match = line.match(/import\(['"](.+)['"]\)/);
      return match ? match[1] : null;
    }).filter(Boolean);

    // Create new content with fixed imports
    let newContent = content.replace(
      /import dynamic from 'next\/dynamic';/,
      `import dynamic from 'next/dynamic';`
    );

    // Replace broken dynamic imports with proper ones
    for (let i = 0; i < Math.min(names.length, paths.length); i++) {
      const brokenImport = new RegExp(`const\\s+${names[i]}\\s*=\\s*dynamic\\(\\('`, 'g');
      const fixedImport = `const ${names[i]} = dynamic(() => import('${paths[i]}'), { ssr: false })`;
      newContent = newContent.replace(brokenImport, fixedImport);
    }

    // Create a backup
    fs.writeFileSync(`${pagePath}.bak`, content);
    console.log(`Created backup: ${pagePath}.bak`);

    // Write the new content
    fs.writeFileSync(pagePath, newContent);
    console.log(`Fixed dynamic imports in: ${pagePath}`);
  } catch (error) {
    console.error(`Error fixing page ${pagePath}:`, error);
  }
};

// Process all page files
const processPageFiles = () => {
  const pageFiles = findPageFiles();
  console.log(`Found ${pageFiles.length} page.tsx files`);

  pageFiles.forEach((pageFile) => {
    fixPageFile(pageFile);
  });
};

// Run the script
processPageFiles(); 