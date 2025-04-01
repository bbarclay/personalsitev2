#!/usr/bin/env node

/**
 * This script converts existing math tool pages to use the new DynamicPanelRenderer
 * It searches for pages with hardcoded tab-panel conditionals and updates them
 * to use the dynamic approach.
 * 
 * Usage:
 * node scripts/convert-to-dynamic-panels.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Paths to search for pages
const MATH_TOOLS_DIR = path.join(__dirname, '../src/app/math');
const PAGE_PATTERN = `${MATH_TOOLS_DIR}/**/page.tsx`;

// Template for the imports section
const importsTemplate = `
import React from 'react';
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';
import { withActiveTab } from '@/components/hoc/withActiveTab';
import dynamic from 'next/dynamic';
import { ToolMetadata } from '@/types/tool';
import { DynamicPanelRenderer } from '@/components/layouts/DynamicPanelRenderer';
`;

// Template for the panels mapping
const panelsTemplate = `
// Map tab IDs to their respective components
const panels = {
  solver: SolverPanel,
  calculator: SolverPanel, // For backward compatibility
  explanation: ExplanationPanel,
  applications: ApplicationsPanel,
  resources: ResourcesPanel,
  // Add any additional panel mappings specific to this tool
};
`;

// Template for the content component
const contentTemplate = `
const ToolContent = withActiveTab(({ activeTab }) => {
  return (
    <DynamicPanelRenderer
      activeTab={activeTab}
      meta={toolMetadata}
      panels={panels}
      panelProps={panelProps}
    />
  );
});
`;

// Find all page.tsx files in the math tools directory
const pageFiles = glob.sync(PAGE_PATTERN);

pageFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already converted
    if (content.includes('DynamicPanelRenderer')) {
      console.log(`✅ Already converted: ${filePath}`);
      return;
    }
    
    // Check if this is a math tool page with activeTab conditionals
    const hasActiveTabConditionals = content.includes('activeTab ===');
    if (!hasActiveTabConditionals) {
      console.log(`⏭️ Skipping (no tab conditionals): ${filePath}`);
      return;
    }
    
    // Extract existing panel conditionals to create panelProps if needed
    const explanationRegex = /explanation="([^"]+)"/;
    const explanationMatch = content.match(explanationRegex);
    let explanationText = '';
    
    if (explanationMatch && explanationMatch[1]) {
      explanationText = explanationMatch[1];
    }
    
    // Create panelProps object
    let panelPropsCode = '';
    if (explanationText) {
      panelPropsCode = `
// Optional panel-specific props
const panelProps = {
  explanation: {
    explanation: "${explanationText}"
  }
};`;
    } else {
      panelPropsCode = `
// Optional panel-specific props
const panelProps = {};`;
    }
    
    // Update imports
    content = content.replace(/import .*framer-motion.*;\n/, '');
    content = content.replace(/import React.*\n/, importsTemplate);
    
    // Insert panels mapping before the content component
    const contentComponentRegex = /const (\w+)Content = withActiveTab\(\(/;
    const contentMatch = content.match(contentComponentRegex);
    
    if (contentMatch) {
      const componentName = contentMatch[1];
      
      // Replace the AnimatePresence and conditionals with DynamicPanelRenderer
      const animatePresenceRegex = /<AnimatePresence[\s\S]*?<\/AnimatePresence>/;
      
      // Add panels mapping before content component
      content = content.replace(
        /const (\w+)Content = withActiveTab/,
        `${panelsTemplate}\n${panelPropsCode}\n\nconst $1Content = withActiveTab`
      );
      
      // Replace the AnimatePresence block with DynamicPanelRenderer
      content = content.replace(
        animatePresenceRegex,
        `<DynamicPanelRenderer
      activeTab={activeTab}
      meta={toolMetadata}
      panels={panels}
      panelProps={panelProps}
    />`
      );
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`❌ Failed to update (no content component found): ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}); 