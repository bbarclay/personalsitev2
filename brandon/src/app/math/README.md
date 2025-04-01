# Math Tools Development Guide

This guide explains how to create new math tools that follow our standardized layout and navigation structure.

## Directory Structure

```
src/app/math/
├── components/           # Shared components for math tools
├── types/               # TypeScript types and schemas
└── [tool-name]/         # Individual tool directory
    ├── components/      # Tool-specific components
    ├── meta.json        # Tool configuration
    └── page.tsx         # Main page component
```

## Creating a New Math Tool

1. Create a new directory for your tool under `src/app/math/[tool-name]/`
2. Create a `meta.json` file with the following structure:

```json
{
  "id": "your-tool-id",
  "title": "Your Tool Title",
  "description": "Brief description of your tool",
  "category": "Main Category",
  "subcategory": "Optional Subcategory",
  "difficulty": "beginner|intermediate|advanced",
  "lastUpdated": "YYYY-MM-DD",
  "icon": "🔢",
  "color": "from-color-600 to-color-700",
  "shape": "rectangle|circle|hexagon",
  "enabled": true,
  "featured": false,
  "tags": ["tag1", "tag2"],
  "keywords": ["keyword1", "keyword2"],
  "relatedTools": ["other-tool-1", "other-tool-2"],
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
      }
      // Add more tabs as needed
    ]
  }
}
```

3. Create your page component using the MathPageLayout:

```tsx
'use client';

import React from 'react';
import { MathPageLayout } from '../components/MathPageLayout';
import { MathToolComponentProps } from '../types/component-types';
import { MathToolMeta } from '../types/tool-config';
import metaJson from './meta.json';

// Cast meta data to ensure type safety
const meta: MathToolMeta = {
  ...metaJson,
  difficulty: metaJson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'
};

function YourToolContent({ activeTab }: MathToolComponentProps) {
  return (
    <div>
      {/* Your tool's content here */}
      {activeTab === 'solver' && <div>Solver Panel</div>}
      {/* Add more tab content */}
    </div>
  );
}

export default function YourToolPage() {
  return (
    <MathPageLayout meta={meta}>
      <YourToolContent />
    </MathPageLayout>
  );
}
```

## Best Practices

1. **Consistent Navigation**: Use the standard sidebar navigation with common tabs like:
   - Solver (Main tool interface)
   - Learn/Explanation (Educational content)
   - Applications (Real-world use cases)
   - Resources (Additional materials)

2. **Component Organization**:
   - Create separate components for each tab's content
   - Use dynamic imports to improve initial load time
   - Keep components focused and modular

3. **Styling**:
   - Use the provided theme colors and gradients
   - Follow the established design patterns
   - Ensure dark mode compatibility

4. **Type Safety**:
   - Use the provided TypeScript types and schemas
   - Properly type all components and props
   - Validate meta.json against the schema

## Shared Components

The following components are available for use in your tool:

- `MathPageLayout`: Main layout wrapper with sidebar navigation
- `LatexDisplay`: For rendering mathematical expressions
- `MatrixInputGrid`: For matrix-based tools
- `NumericDisplay`: For formatted number output
- (Add other available components)

## Adding New Features

When adding new features or components that could be useful across multiple tools:

1. Add them to the shared components directory
2. Update this documentation
3. Consider making them configurable via meta.json
4. Ensure they follow our design patterns and accessibility standards

## Example Tools

For reference, look at these implemented tools:

- Linear Solver (`/math/linear-solver`)
- Polynomial Solver (`/math/polynomial`)
- (Add other example tools)
