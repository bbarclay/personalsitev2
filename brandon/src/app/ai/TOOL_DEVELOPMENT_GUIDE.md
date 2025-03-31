# AI Tool Development Guide

This guide outlines the standardized structure and best practices for creating new AI tools in the Brandon platform.

## Directory Structure

Each AI tool should follow this directory structure:

```
/ai/[tool-name]/
├── page.tsx              # Main page component
├── meta.json            # Tool metadata and configuration
└── components/          # Tool-specific components
    ├── ToolPanel.tsx    # Main tool interface
    ├── ExplanationPanel.tsx
    ├── ApplicationsPanel.tsx
    └── ResourcesPanel.tsx
```

## Meta Configuration

The `meta.json` file must include all required fields from the `ToolMeta` type:

```json
{
  "id": "tool-name",
  "title": "Tool Name",
  "description": "Brief description of the tool",
  "category": "Category Name",
  "subcategory": "Subcategory Name",
  "featured": true,
  "type": "ai",
  "difficulty": "beginner|intermediate|advanced",
  "lastUpdated": "YYYY-MM-DD",
  "icon": "🤖",
  "color": "from-orange-500 to-pink-500",
  "shape": "rectangle",
  "enabled": true,
  "tags": ["tag1", "tag2"],
  "keywords": ["keyword1", "keyword2"],
  "sidebar": {
    "tabs": [
      {
        "id": "solver",
        "label": "Tool",
        "icon": "⚡",
        "color": {
          "active": "bg-orange-500 text-white",
          "hover": "bg-orange-100 dark:bg-orange-900"
        }
      },
      {
        "id": "explanation",
        "label": "Explanation",
        "icon": "📚",
        "color": {
          "active": "bg-pink-500 text-white",
          "hover": "bg-pink-100 dark:bg-pink-900"
        }
      },
      {
        "id": "applications",
        "label": "Applications",
        "icon": "🎯",
        "color": {
          "active": "bg-indigo-500 text-white",
          "hover": "bg-indigo-100 dark:bg-indigo-900"
        }
      },
      {
        "id": "resources",
        "label": "Resources",
        "icon": "📖",
        "color": {
          "active": "bg-rose-500 text-white",
          "hover": "bg-rose-100 dark:bg-rose-900"
        }
      }
    ]
  },
  "navigation": {
    "category": {
      "title": "AI Tools",
      "path": "/ai"
    },
    "nextTools": [
      {
        "id": "next-tool",
        "title": "Next Tool",
        "icon": "➡️",
        "path": "/ai/next-tool"
      }
    ]
  }
}
```

## Page Component

The main `page.tsx` should follow this structure:

```typescript
"use client";

import React from 'react';
import { ToolPageLayout, withActiveTab } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import metaJson from './meta.json';
import { ToolMeta, ToolComponentProps } from '@/types/tool-types';
import { motion, AnimatePresence } from 'framer-motion';

// Cast and validate the meta data
const meta: ToolMeta = {
  ...metaJson,
  type: 'ai' as const,
  difficulty: metaJson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
};

// Dynamically import components
const ToolPanel = dynamic(() => import('./components/ToolPanel'), { ssr: false });
const ExplanationPanel = dynamic(() => import('./components/ExplanationPanel'), { ssr: false });
const ApplicationsPanel = dynamic(() => import('./components/ApplicationsPanel'), { ssr: false });
const ResourcesPanel = dynamic(() => import('./components/ResourcesPanel'), { ssr: false });

const ToolContent = withActiveTab(function ToolContent({ activeTab }: ToolComponentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
      >
        {activeTab === 'solver' && <ToolPanel />}
        {activeTab === 'explanation' && <ExplanationPanel explanation={meta.description} />}
        {activeTab === 'applications' && <ApplicationsPanel />}
        {activeTab === 'resources' && <ResourcesPanel />}
      </motion.div>
    </AnimatePresence>
  );
});

export default function ToolPage() {
  return (
    <ToolPageLayout meta={meta}>
      <ToolContent activeTab="solver" />
    </ToolPageLayout>
  );
}
```

## Component Guidelines

1. **ToolPanel**: Main tool interface
   - Should be responsive and mobile-friendly
   - Use appropriate form controls and validation
   - Include clear error messages and loading states
   - Show results in a clear, visually appealing way
   - Handle API calls and data processing
   - Implement proper error handling for API failures

2. **ExplanationPanel**: Educational content
   - Clear, concise explanations of the AI concept
   - Include examples and use cases
   - Explain the underlying technology
   - Add visual aids when helpful
   - Include limitations and considerations

3. **ApplicationsPanel**: Real-world uses
   - Practical examples
   - Industry applications
   - Related fields and disciplines
   - Case studies if applicable
   - Future potential and developments

4. **ResourcesPanel**: Additional materials
   - Related tools and services
   - External resources and references
   - Learning materials
   - Further reading
   - Community resources

## Best Practices

1. **Performance**
   - Use dynamic imports for components
   - Implement proper loading states
   - Optimize API calls and data processing
   - Cache results when appropriate
   - Handle rate limiting and quotas

2. **Accessibility**
   - Use semantic HTML
   - Include ARIA labels
   - Ensure keyboard navigation works
   - Support screen readers
   - Provide alternative text for AI-generated content

3. **Responsive Design**
   - Test on multiple screen sizes
   - Ensure mobile usability
   - Use appropriate spacing and typography
   - Handle long content appropriately

4. **Error Handling**
   - Validate user input
   - Show clear error messages
   - Handle API failures gracefully
   - Provide fallback options
   - Log errors appropriately

5. **Testing**
   - Write unit tests for components
   - Test edge cases and error conditions
   - Ensure cross-browser compatibility
   - Test API integration
   - Validate AI model outputs

## Example Implementation

See the data analysis tool implementation in `/ai/data-analysis/` for a complete example of following these guidelines. 