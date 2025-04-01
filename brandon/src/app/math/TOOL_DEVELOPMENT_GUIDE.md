# Math Tool Development Guide

This guide outlines the standardized structure and best practices for creating new math tools in the Brandon platform.

## Directory Structure

Each math tool should follow this directory structure:

```
/math/[tool-name]/
├── page.tsx              # Main page component
├── meta.json            # Tool metadata and configuration
└── components/          # Tool-specific components
    ├── SolverPanel.tsx  # Main tool interface
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
  "type": "math",
  "difficulty": "beginner|intermediate|advanced",
  "lastUpdated": "YYYY-MM-DD",
  "icon": "🔢",
  "color": "from-blue-500 to-purple-500",
  "shape": "rectangle",
  "enabled": true,
  "tags": ["tag1", "tag2"],
  "keywords": ["keyword1", "keyword2"],
  "sidebar": {
    "tabs": [
      {
        "id": "solver",
        "label": "Solver",
        "icon": "⚡",
        "color": {
          "active": "bg-blue-500 text-white",
          "hover": "bg-blue-100 dark:bg-blue-900"
        }
      },
      {
        "id": "explanation",
        "label": "Explanation",
        "icon": "📚",
        "color": {
          "active": "bg-purple-500 text-white",
          "hover": "bg-purple-100 dark:bg-purple-900"
        }
      },
      {
        "id": "applications",
        "label": "Applications",
        "icon": "🎯",
        "color": {
          "active": "bg-green-500 text-white",
          "hover": "bg-green-100 dark:bg-green-900"
        }
      },
      {
        "id": "resources",
        "label": "Resources",
        "icon": "📖",
        "color": {
          "active": "bg-orange-500 text-white",
          "hover": "bg-orange-100 dark:bg-orange-900"
        }
      }
    ]
  },
  "navigation": {
    "category": {
      "title": "Mathematics",
      "path": "/math"
    },
    "nextTools": [
      {
        "id": "next-tool",
        "title": "Next Tool",
        "icon": "➡️",
        "path": "/math/next-tool"
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
  type: 'math' as const,
  difficulty: metaJson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
};

// Dynamically import components
const SolverPanel = dynamic(() => import('./components/SolverPanel'), { ssr: false });
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
        {activeTab === 'solver' && <SolverPanel />}
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

1. **SolverPanel**: Main tool interface
   - Should be responsive and mobile-friendly
   - Use appropriate form controls and validation
   - Include clear error messages and loading states
   - Show results in a clear, visually appealing way

2. **ExplanationPanel**: Educational content
   - Clear, concise explanations
   - Include examples and step-by-step solutions
   - Use appropriate mathematical notation
   - Add visual aids when helpful

3. **ApplicationsPanel**: Real-world uses
   - Practical examples
   - Industry applications
   - Related fields and disciplines
   - Case studies if applicable

4. **ResourcesPanel**: Additional materials
   - Related tools and calculators
   - External resources and references
   - Practice problems
   - Further reading

## Best Practices

1. **Performance**
   - Use dynamic imports for components
   - Implement proper loading states
   - Optimize calculations and rendering

2. **Accessibility**
   - Use semantic HTML
   - Include ARIA labels
   - Ensure keyboard navigation works
   - Support screen readers

3. **Responsive Design**
   - Test on multiple screen sizes
   - Ensure mobile usability
   - Use appropriate spacing and typography

4. **Error Handling**
   - Validate user input
   - Show clear error messages
   - Handle edge cases gracefully

5. **Testing**
   - Write unit tests for components
   - Test edge cases and error conditions
   - Ensure cross-browser compatibility

## Example Implementation

See the linear solver implementation in `/math/linear-solver/` for a complete example of following these guidelines. 