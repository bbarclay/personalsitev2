#!/bin/bash

# Script to update all math pages to properly import and use their MainComponent.tsx files

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
  local component_file="$dir_path/components/MainComponent.tsx"
  
  if [[ ! -f "$component_file" ]]; then
    echo "Warning: No MainComponent.tsx found in $dir_path/components"
    return
  fi
  
  if grep -q "import.*MainComponent" "$page_file"; then
    echo "Page $page_file already updated"
    return
  fi
  
  echo "Updating $page_file..."

  # Get component export name from MainComponent.tsx
  local export_line=$(grep -E "export default |export const " "$component_file" | head -1)
  local exported_name=""
  
  if [[ $export_line =~ export\ default\ ([A-Za-z0-9_]+) ]]; then
    exported_name="${BASH_REMATCH[1]}"
  elif [[ $export_line =~ export\ default\ function\ ([A-Za-z0-9_]+) ]]; then
    exported_name="${BASH_REMATCH[1]}"
  elif [[ $export_line =~ export\ const\ ([A-Za-z0-9_]+) ]]; then
    exported_name="${BASH_REMATCH[1]}"
  else
    exported_name="$component_name"
  fi
  
  # Create a temporary file for the new content
  tmp_file=$(mktemp)
  
  {
    # Preserve shebang line
    head -1 "$page_file"
    echo ""
    
    # Add imports
    cat << EOF
import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import $exported_name from './components/MainComponent';

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
      <$exported_name />
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
  } > "$tmp_file"
  
  # Replace the old file with the new content
  mv "$tmp_file" "$page_file"
  
  echo "Updated $page_file successfully"
}

# Process all math directories with MainComponent.tsx files
for component_file in $(find "$BASE_DIR" -name "MainComponent.tsx"); do
  dir_path=$(dirname "$(dirname "$component_file")")
  update_page "$dir_path"
done

echo "Update completed!" 