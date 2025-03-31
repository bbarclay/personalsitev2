# ChatBot Academy 🤖

An interactive, gamified learning experience that teaches users about chatbots in a fun and engaging way. Built with Next.js, React, and Framer Motion.

## Features

- 🎮 Interactive Bot Building Laboratory
- 🧠 AI Training Arena
- 💬 Real-time Chat Simulator
- 🏆 Challenge Zone with Achievements
- 🌓 Beautiful Dark/Light Mode
- ✨ Smooth Animations and Transitions

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to start learning!

## Learning Journey

The application guides users through an engaging learning experience:

1. **Bot Building Laboratory** 🔧
   - Design your bot's personality
   - Choose expertise areas
   - Customize appearance

2. **AI Training Arena** 🧠
   - Learn about NLP concepts
   - Understand pattern matching
   - Explore machine learning basics

3. **Chat Simulator** 💬
   - Test your bot in real-time
   - Practice conversation flows
   - Debug and improve responses

4. **Challenge Zone** 🏆
   - Complete interactive exercises
   - Earn achievements
   - Track your progress

## Tech Stack

- Next.js 14
- React 18
- Framer Motion
- TailwindCSS
- TypeScript

## Contributing

Feel free to contribute to this project! Open an issue or submit a pull request.

## License

MIT License - feel free to use this project for learning and teaching purposes!

# Tool Pages Standardization

## Standard File Structure

Each tool should follow this standard file structure:

1. `meta.json` - Contains all tool metadata including sidebar tabs
2. `layout.tsx` - Handles Next.js metadata export
3. `page.tsx` - Renders the tool UI using the ToolPageLayout component

## Standardized Approach

We've implemented a standardized approach for tool pages:

1. **Metadata** is loaded using `loadToolMeta` from `@/utils/meta-loader`
2. **Layout files** are created using `createToolLayout` from `@/utils/tool-page`
3. **Page files** use the `ToolPageLayout` component to render the UI

## Example Implementation

### meta.json
```json
{
  "id": "my-tool",
  "title": "My Tool",
  "description": "Description of my tool",
  "type": "math",
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
    ]
  }
}
```

### layout.tsx
```tsx
import { createToolLayout } from '@/utils/tool-page';
import metaJson from './meta.json';

// Create a standardized layout with metadata
const { metadata } = createToolLayout(metaJson);

// Export the metadata for Next.js
export { metadata };

// Simple layout component that renders children
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

### page.tsx
```tsx
"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component with placeholders
const ToolContent = createDynamicPanelComponent({
  solver: () => <div>Solver panel content</div>,
  explanation: () => <div>Explanation panel content</div>,
  applications: () => <div>Applications panel content</div>,
  resources: () => <div>Resources panel content</div>
});

export default function ToolPage() {
  return (
    <ToolPageLayout meta={meta}>
      <ToolContent />
    </ToolPageLayout>
  );
}
```

## Standardization Scripts

We've created scripts to help standardize all tools:

- `scripts/standardize-meta.js` - Ensures all meta.json files have proper sidebar tabs
- `scripts/standardize-pages.js` - Creates layout.tsx files and identifies pages that need standardization

Run these scripts to update your codebase:

```bash
node scripts/standardize-meta.js
node scripts/standardize-pages.js
```
