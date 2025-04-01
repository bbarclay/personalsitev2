/**
 * This script helps standardize tool pages by generating layout.tsx files
 * and updating page.tsx files to use loadToolMeta.
 * 
 * Usage: node standardize-pages.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LAYOUT_TEMPLATE = `import { createToolLayout } from '@/utils/tool-page';
import metaJson from './meta.json';

// Create a standardized layout with metadata
const { metadata } = createToolLayout(metaJson);

// Export the metadata for Next.js
export { metadata };

// Simple layout component that renders children
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;

const PAGE_TEMPLATE = `"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Basic placeholder components
const PlaceholderPanel = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Tool Page</h2>
    <p className="text-gray-700 dark:text-gray-300">
      This is a placeholder for content. Replace with actual implementation.
    </p>
  </div>
);

// Create dynamic panel component with placeholders
const ToolContent = createDynamicPanelComponent({
  solver: PlaceholderPanel,
  explanation: PlaceholderPanel,
  applications: PlaceholderPanel,
  resources: PlaceholderPanel
});

export default function ToolPage() {
  return (
    <ToolPageLayout meta={meta}>
      <ToolContent />
    </ToolPageLayout>
  );
}
`;

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

// Create layout.tsx file for a directory with meta.json
const createLayoutFile = (metaFilePath) => {
  const dirPath = path.dirname(metaFilePath);
  const layoutPath = path.join(dirPath, 'layout.tsx');
  
  // Skip if layout already exists
  if (fs.existsSync(layoutPath)) {
    console.log(`Layout already exists: ${layoutPath}`);
    return;
  }
  
  try {
    fs.writeFileSync(layoutPath, LAYOUT_TEMPLATE);
    console.log(`Created layout file: ${layoutPath}`);
  } catch (error) {
    console.error(`Error creating layout file ${layoutPath}:`, error);
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
    // Read the current file to check for components
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    // Instead of completely replacing, preserve component imports and implementations
    // For now, we'll just mark files that need manual standardization
    console.log(`Page needs manual standardization: ${pagePath}`);
    
    // For a fully automated solution, you'd need more complex parsing and transformation
    // fs.writeFileSync(pagePath, PAGE_TEMPLATE);
  } catch (error) {
    console.error(`Error standardizing page ${pagePath}:`, error);
  }
};

// Process all meta.json files
const processMetaFiles = () => {
  const metaFiles = findMetaFiles();
  console.log(`Found ${metaFiles.length} meta.json files`);
  
  metaFiles.forEach((metaFile) => {
    createLayoutFile(metaFile);
    standardizePage(metaFile);
  });
};

// Run the script
processMetaFiles(); 