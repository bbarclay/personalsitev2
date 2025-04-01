#!/bin/bash

# Script to move math example pages to the proper directory

BASE_DIR="/Users/bobbarclay/newbrandon/brandon"
SOURCE_DIR="$BASE_DIR/example_pages/math"
TARGET_DIR="$BASE_DIR/src/app/math"

# Function to convert names to kebab case
function to_kebab_case() {
  echo "$1" | sed 's/[A-Z]/-\L&/g' | sed 's/^-//' | sed 's/_/-/g'
}

# Function to create meta.json file
function create_meta_json() {
  local dir_name="$1"
  local title="$2"
  local description="$3"
  
  cat > "$TARGET_DIR/$dir_name/meta.json" << EOF
{
  "id": "$dir_name",
  "title": "$title",
  "description": "$description",
  "category": "Mathematics",
  "subcategory": "Interactive Tools",
  "type": "math",
  "difficulty": "intermediate",
  "lastUpdated": "$(date +%Y-%m-%d)",
  "icon": "🧮",
  "color": "from-blue-500 to-purple-500",
  "shape": "rectangle",
  "enabled": true,
  "featured": false,
  "tags": ["math", "interactive"],
  "keywords": ["$dir_name", "math", "tool"],
  "sidebar": {
    "tabs": [
      {
        "id": "solver",
        "label": "Solver",
        "icon": "🧮",
        "color": {
          "active": "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300",
          "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
        }
      },
      {
        "id": "explanation",
        "label": "Explanation",
        "icon": "📚",
        "color": {
          "active": "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300",
          "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
        }
      },
      {
        "id": "applications",
        "label": "Applications",
        "icon": "🌐",
        "color": {
          "active": "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300",
          "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
        }
      },
      {
        "id": "resources",
        "label": "Resources",
        "icon": "📖",
        "color": {
          "active": "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300",
          "hover": "bg-gray-100 dark:hover:bg-gray-700/50"
        }
      }
    ]
  }
}
EOF
}

# Function to create page.tsx file
function create_page_tsx() {
  local dir_name="$1"
  local component_name="$2"
  
  cat > "$TARGET_DIR/$dir_name/page.tsx" << EOF
"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

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
      </div>
      {/* Import the original component here */}
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
}

# Function to create layout.tsx file
function create_layout_tsx() {
  local dir_name="$1"
  
  cat > "$TARGET_DIR/$dir_name/layout.tsx" << EOF
"use client";

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
EOF
}

# Process common file-based components
for file in "$SOURCE_DIR"/*.tsx; do
  if [ -f "$file" ]; then
    filename=$(basename "$file" .tsx)
    
    # Skip certain files
    if [[ "$filename" == "registry" ]]; then
      continue
    fi
    
    # Convert to kebab case for directory name
    dir_name=$(to_kebab_case "$filename")
    
    # Get component name in PascalCase for code
    component_name=$(echo "$filename" | sed -r 's/(^|[-_])([a-z])/\U\2/g' | sed 's/-//g')
    
    echo "Processing: $filename -> $dir_name"
    
    # Create the directory
    mkdir -p "$TARGET_DIR/$dir_name/components"
    
    # Create necessary files
    create_meta_json "$dir_name" "${component_name//-/ }" "Interactive ${component_name//-/ } tool for mathematics exploration"
    create_page_tsx "$dir_name" "$component_name"
    create_layout_tsx "$dir_name"
    
    # Copy the component file to a more appropriate location
    cp "$file" "$TARGET_DIR/$dir_name/components/MainComponent.tsx"
  fi
done

# Process directory-based components
for directory in "$SOURCE_DIR"/*/ ; do
  if [ -d "$directory" ]; then
    dir_basename=$(basename "$directory")
    
    # Skip utils directory
    if [[ "$dir_basename" == "utils" ]]; then
      continue
    fi
    
    # Convert to kebab case for directory name
    dir_name=$(to_kebab_case "$dir_basename")
    
    # Get component name in PascalCase for code
    component_name=$(echo "$dir_basename" | sed -r 's/(^|[-_])([a-z])/\U\2/g' | sed 's/-//g')
    
    echo "Processing directory: $dir_basename -> $dir_name"
    
    # Create the directory
    mkdir -p "$TARGET_DIR/$dir_name/components"
    
    # Create necessary files
    create_meta_json "$dir_name" "${component_name//-/ }" "Interactive ${component_name//-/ } tool for mathematics exploration"
    create_page_tsx "$dir_name" "$component_name"
    create_layout_tsx "$dir_name"
    
    # Copy all files from the directory
    cp -r "$directory"/* "$TARGET_DIR/$dir_name/components/"
  fi
done

echo "Migration completed!" 