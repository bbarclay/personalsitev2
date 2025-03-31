#!/bin/bash

# This script checks all math tool directories for missing required components
# The four required components are:
# - SolverPanel.tsx
# - ExplanationPanel.tsx
# - ApplicationsPanel.tsx
# - ResourcesPanel.tsx

echo "Checking for math tools with missing components..."

# Get all math tool directories that contain a page.tsx file
for dir in $(find src/app/math -type f -name 'page.tsx' | grep -v "src/app/math/page.tsx" | xargs dirname); do
  echo "Checking $dir..."
  
  # Check if components directory exists
  if [ ! -d "$dir/components" ]; then
    echo "⚠️ $dir is missing components directory"
    continue
  fi
  
  # Check for each required component
  for component in SolverPanel.tsx ExplanationPanel.tsx ApplicationsPanel.tsx ResourcesPanel.tsx; do
    if [ ! -f "$dir/components/$component" ]; then
      echo "⚠️ $dir is missing $component"
    fi
  done
done

echo "Done checking!" 