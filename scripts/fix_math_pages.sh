#!/bin/bash

# Script to fix all math pages to properly import and use their components

BASE_DIR="/Users/bobbarclay/newbrandon/brandon/src/app/math"

# Function to convert kebab-case to PascalCase
function to_pascal_case() {
  echo "$1" | sed -E 's/(^|[-])([a-z])/\U\2/g'
}

# Function to update a page.tsx file for a given directory
function update_page() {
  local dir_path="$1"
  local dir_name=$(basename "$dir_path")
  local component_name=$(to_pascal_case "$dir_name")
  local page_file="$dir_path/page.tsx"
  
  # Check for component files
  local main_component="$dir_path/components/MainComponent.tsx"
  local index_component="$dir_path/components/index.tsx"
  local component_to_use=""
  local import_style=""
  
  if [[ -f "$main_component" ]]; then
    component_to_use="$main_component"
    import_style="main"
  elif [[ -f "$index_component" ]]; then
    component_to_use="$index_component"
    import_style="index"
  else
    echo "Warning: No component found in $dir_path/components"
    return
  fi
  
  echo "Updating $page_file..."
  
  # Create a temporary file for the new content
  tmp_file=$(mktemp)
  
  # Write the new page content
  cat > "$tmp_file" << EOF
"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
EOF

  # Add appropriate imports based on component style
  if [[ "$import_style" == "main" ]]; then
    echo "import MainComponent from './components/MainComponent';" >> "$tmp_file"
  else
    echo "import IndexComponent from './components/index';" >> "$tmp_file"
  fi

  # Continue with the rest of the file
  cat >> "$tmp_file" << EOF

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Define placeholder content for each panel
const PlaceholderContent = () => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
    <h2 className="text-xl font-medium mb-4">Content Coming Soon</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This section is being developed. Check back soon for updates!
    </p>
  </div>
);

// Create dynamic panel component
const ${component_name}Content = createDynamicPanelComponent({
  solver: () => (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">${component_name}</h2>
        <p>Interactive ${component_name//-/ } visualization and calculation tool.</p>
      </div>
EOF

  # Add the appropriate component usage
  if [[ "$import_style" == "main" ]]; then
    echo "      <MainComponent />" >> "$tmp_file"
  else
    echo "      <IndexComponent />" >> "$tmp_file"
  fi

  # Complete the file
  cat >> "$tmp_file" << EOF
    </div>
  ),
  explanation: PlaceholderContent,
  applications: PlaceholderContent,
  resources: PlaceholderContent
});

export default function ${component_name}Page() {
  return (
    <ToolPageLayout meta={meta}>
      <${component_name}Content />
    </ToolPageLayout>
  );
}
EOF
  
  # Replace the old file with the new content
  mv "$tmp_file" "$page_file"
  
  echo "Updated $page_file successfully"
}

# Process all math directories that have page.tsx files
for page_file in $(find "$BASE_DIR" -path "*/page.tsx" | grep -v "node_modules" | grep -v "/components/" | grep -v "/types/" | grep -v "/utils/" | grep -v "/config/"); do
  dir_path=$(dirname "$page_file")
  update_page "$dir_path"
done

echo "Fix completed!" 