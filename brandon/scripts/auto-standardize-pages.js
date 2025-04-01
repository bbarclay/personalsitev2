/**
 * This script automatically standardizes page.tsx files to use loadToolMeta.
 * Unlike the standardize-pages.js script which just identifies pages that need standardization,
 * this script actually performs the conversion automatically.
 * 
 * Usage: node auto-standardize-pages.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Check if a page file needs standardization
const needsStandardization = (pagePath) => {
  if (!fs.existsSync(pagePath)) {
    return false;
  }
  
  const content = fs.readFileSync(pagePath, 'utf-8');
  
  // Check if the page is already using loadToolMeta
  return !content.includes('loadToolMeta');
};

// Standardize a page.tsx file to use loadToolMeta
const standardizePage = (metaFilePath) => {
  const dirPath = path.dirname(metaFilePath);
  const pagePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`Page does not exist: ${pagePath}`);
    return;
  }
  
  if (!needsStandardization(pagePath)) {
    console.log(`Page already standardized: ${pagePath}`);
    return;
  }
  
  try {
    // Read the current file
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    // Find dynamic imports - we want to preserve these
    const dynamicImports = content.match(/const\s+\w+\s*=\s*dynamic\(\s*\(\)\s*=>\s*import\([^)]+\)\s*,\s*\{[^}]*\}\s*\)/g) || [];
    
    // If we don't find properly formatted imports, extract component names and paths
    if (dynamicImports.length === 0) {
      const importPaths = content.match(/import\(['"]\.\/components\/([^'"]+)['"]\)/g) || [];
      const componentNames = content.match(/const\s+(\w+)\s*=\s*dynamic/g) || [];
      
      // Extract component names
      const names = componentNames.map(line => {
        const match = line.match(/const\s+(\w+)/);
        return match ? match[1] : null;
      }).filter(Boolean);
      
      // Extract paths
      const paths = importPaths.map(line => {
        const match = line.match(/import\(['"](.+)['"]\)/);
        return match ? match[1] : null;
      }).filter(Boolean);
      
      // Create proper dynamic imports
      for (let i = 0; i < Math.min(names.length, paths.length); i++) {
        dynamicImports.push(`const ${names[i]} = dynamic(() => import('${paths[i]}'), { ssr: false })`);
      }
    }
    
    // Find component definitions - we want to preserve these
    const componentDefs = content.match(/const\s+\w+\s*=\s*[^;]+=>.*?(?=const|export|$)/gs) || [];
    
    // Check for createDynamicPanelComponent
    const dynamicPanelDef = content.match(/const\s+\w+\s*=\s*createDynamicPanelComponent\([^;]+;/gs) || [];
    
    // Extract the page component name from export default function NAME
    const pageComponentMatch = content.match(/export\s+default\s+function\s+(\w+)/);
    const pageComponentName = pageComponentMatch ? pageComponentMatch[1] : 'Page';
    
    // Basic transformed content
    let newContent = `"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

`;

    // No need to re-add dynamic import since we already included it above
    
    // Add dynamic imports if any
    if (dynamicImports.length > 0) {
      newContent += `// Dynamically import components\n`;
      newContent += dynamicImports.join(';\n') + ';\n\n';
    }
    
    // Add component definitions if any
    if (componentDefs.length > 0) {
      newContent += componentDefs.join('\n\n') + '\n\n';
    }
    
    // Add dynamic panel definition if any
    if (dynamicPanelDef.length > 0) {
      newContent += dynamicPanelDef.join('\n\n') + '\n\n';
    } else {
      // Extract the tool name from the page component name (e.g., "LinearSystemsPage" -> "LinearSystems")
      const toolName = pageComponentName.replace(/Page$/, '');
      
      // Add a default dynamic panel definition
      newContent += `// Create dynamic panel component with placeholders
const ${toolName}Content = createDynamicPanelComponent({
  solver: () => <div>Solver panel content</div>,
  explanation: () => <div>Explanation panel content</div>,
  applications: () => <div>Applications panel content</div>,
  resources: () => <div>Resources panel content</div>
});\n\n`;
    }
    
    // Add the page component
    newContent += `export default function ${pageComponentName}() {
  return (
    <ToolPageLayout meta={meta}>
      ${dynamicPanelDef.length > 0 ? `<${pageComponentName.replace(/Page$/, '')}Content />` : '<div>Tool content</div>'}
    </ToolPageLayout>
  );
}`;
    
    // Create a backup
    fs.writeFileSync(`${pagePath}.bak`, content);
    console.log(`Created backup: ${pagePath}.bak`);
    
    // Write the new content
    fs.writeFileSync(pagePath, newContent);
    console.log(`Standardized page: ${pagePath}`);
  } catch (error) {
    console.error(`Error standardizing page ${pagePath}:`, error);
  }
};

// Process all meta.json files
const processMetaFiles = () => {
  const metaFiles = findMetaFiles();
  console.log(`Found ${metaFiles.length} meta.json files`);
  
  metaFiles.forEach((metaFile) => {
    standardizePage(metaFile);
  });
};

// Run the script
processMetaFiles(); 