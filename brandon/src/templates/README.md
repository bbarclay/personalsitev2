# Tool Templates

This directory contains templates for creating new tools in the Brandon app. Follow these instructions to ensure all tools have a consistent layout and appearance.

## Creating a New Tool

To create a new tool, follow these steps:

1. Create a new directory for your tool in the appropriate location:
   - For math tools: `/src/app/math/[category]/[tool-name]/`
   - For AI tools: `/src/app/ai/[category]/[tool-name]/`

2. Copy the following templates to your new tool directory:
   - `tool-page-template.tsx` → `page.tsx` (Client component for the tool UI)
   - `tool-layout-template.tsx` → `layout.tsx` (Server component for metadata)
   - Create a `meta.json` file based on the structure below

3. Create a `components` directory for your tool-specific components
   - Put the main interactive component in `components/YourToolName.tsx`

4. Customize the files to match your tool's functionality

## File Structure Example

```
src/app/math/probability/coin-flip-simulator/
├── meta.json               # Tool metadata
├── page.tsx                # Client component (UI)
├── layout.tsx              # Server component (metadata)
└── components/
    ├── CoinFlipSimulator.tsx  # Main tool component
    └── ... other components
```

## meta.json Template

```json
{
  "id": "your-tool-id",
  "title": "Your Tool Title",
  "description": "A detailed description of what your tool does",
  "category": "Main Category",
  "subcategory": "Subcategory (optional)",
  "featured": true,
  "difficulty": "beginner",
  "lastUpdated": "YYYY-MM-DD",
  "icon": "🔮",
  "color": "from-blue-600 to-indigo-700",
  "shape": "rectangle",
  "enabled": true,
  "tags": ["tag1", "tag2", "tag3"],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "relatedTools": ["other-tool-id-1", "other-tool-id-2"]
}
```

## Important Notes

1. **Client vs Server Components**:
   - The `page.tsx` file must include `"use client"` at the top since it uses client-side interactivity
   - The `layout.tsx` file must NOT include `"use client"` since it exports metadata

2. **Metadata**:
   - Always put metadata exports in the `layout.tsx` file
   - Never export metadata from a client component

3. **Consistent Layout**:
   - Always use the `ToolLayout` component as the root component in your page
   - Wrap your actual tool component in a div with `className="p-6"`

4. **Dark Mode Support**:
   - All components should support dark mode using Tailwind's dark: variants
   - Use `text-gray-900 dark:text-white` for headings
   - Use `text-gray-700 dark:text-gray-300` for body text
   - Use `bg-white dark:bg-gray-800` for backgrounds

5. **Testing**:
   - Test your tool in both light and dark modes
   - Test that navigation (back button) works correctly
   - Verify that your tool appears in the appropriate category on the main page 