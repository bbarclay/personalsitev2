#!/bin/bash

# Function to update a tool page
update_tool_page() {
  local file=$1
  echo "Updating $file..."
  
  # Get the base name of the component from the file path
  local basename=$(basename $(dirname $file))
  local componentName=$(echo $basename | sed 's/\([a-z]\)\([a-zA-Z0-9]*\)/\u\1\2/g')Content
  
  # Make a backup
  cp $file ${file}.bak
  
  # 1. Update imports
  sed -i '' 's/import { ToolPageLayout } from/import { ToolPageLayout, withActiveTab } from/g' $file
  sed -i '' 's/import { withActiveTab } from .\/components\/hoc\/withActiveTab.;//g' $file
  sed -i '' 's/import { ToolMetadata } from .\/types\/tool.;/import { ToolMeta, ToolComponentProps } from '\''@\/types\/tool-types'\'';/g' $file
  
  # 2. Update metadata
  sed -i '' 's/import metadata from/import metaJson from/g' $file
  sed -i '' 's/const toolMetadata = metadata as ToolMetadata;/const meta: ToolMeta = {\
  ...metaJson,\
  type: '\''math'\'' as const,\
  difficulty: metaJson.difficulty.toLowerCase() as '\''beginner'\'' | '\''intermediate'\'' | '\''advanced'\''\
};/g' $file
  
  # 3. Remove validation check
  sed -i '' '/\/\/ Validate required fields/d' $file
  sed -i '' '/if (!toolMetadata.type || !toolMetadata.difficulty) {/d' $file
  sed -i '' '/throw new Error.Missing required metadata fields.;/d' $file
  sed -i '' '/}/d' $file
  
  # 4. Update component definition
  sed -i '' "s/const ${componentName} = withActiveTab(({ activeTab }) => {/const ${componentName} = withActiveTab(function ${componentName}({ activeTab }: ToolComponentProps) {/g" $file
  
  # 5. Add className
  sed -i '' 's/transition={{ duration: 0.2 }}/transition={{ duration: 0.2 }}\
        className="bg-white\/80 dark:bg-gray-800\/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"/g' $file
  
  # 6. Change calculator to solver
  sed -i '' 's/activeTab === '\''calculator'\''/activeTab === '\''solver'\''/g' $file
  
  # 7. Update the JSX at the bottom
  sed -i '' "s/<ToolPageLayout\\
      metadata={toolMetadata}\\
      content={<${componentName} \\/>}\\
    \\/>/<ToolPageLayout meta={meta}>\
      <${componentName} \\/>\
    <\\/ToolPageLayout>/g" $file
  
  echo "✅ Updated $file"
}

# Update all the remaining files
files=$(grep -l --include="*.tsx" "metadata={toolMetadata}" src/app/math/)

# Process each file
for file in $files; do
  update_tool_page "$file"
done

echo "All files have been updated!" 