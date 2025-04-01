#!/bin/bash

# Find all pages that use the old ToolPageLayout props
echo "Files that need to be updated:"
grep -r --include="*.tsx" "metadata={toolMetadata}" src/app/math/
grep -r --include="*.tsx" "content={<" src/app/math/

echo ""
echo "Manual updates needed for each file to use:"
echo "1. Change import { ToolPageLayout } to import { ToolPageLayout, withActiveTab }"
echo "2. Replace import { withActiveTab } from '@/components/hoc/withActiveTab'"
echo "3. Change import { ToolMetadata } from '@/types/tool' to import { ToolMeta, ToolComponentProps } from '@/types/tool-types'"
echo "4. Replace metadata/toolMetadata with metaJson/meta"
echo "5. Add type information to the component function"
echo "6. Change activeTab === 'calculator' to activeTab === 'solver'"
echo "7. Change <ToolPageLayout metadata={toolMetadata} content={<Component />} /> to <ToolPageLayout meta={meta}><Component /></ToolPageLayout>" 