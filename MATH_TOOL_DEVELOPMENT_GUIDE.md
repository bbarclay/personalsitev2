# Math Tool Development Guide

This guide provides instructions for creating new math tools within our application's architecture. Follow these conventions to ensure consistency and facilitate maintenance.

## Directory Structure

Each math tool follows this standard structure:

```
src/app/math/[category]/[tool-name]/
├── components/
│   └── ToolNameComponent.tsx    # Main interactive component
├── utils/
│   └── tool-utils.ts            # Utility functions for calculations
├── page.tsx                     # Next.js page component
└── meta.json                    # Tool metadata
```

For example, for a Linear Systems Solver:
```
src/app/math/algebra/linear-systems/
├── components/
│   └── LinearSystemsSolver.tsx  # Main component
├── utils/
│   └── system-solver-utils.ts   # Utility functions
├── page.tsx                     # Page component
└── meta.json                    # Metadata
```

## Implementing a New Math Tool

### 1. Create the Directory Structure

First, create the appropriate directory structure:

```bash
mkdir -p src/app/math/[category]/[tool-name]/components
mkdir -p src/app/math/[category]/[tool-name]/utils
```

### 2. Create the Metadata File

Create a `meta.json` file that describes your tool:

```json
{
  "id": "tool-name",
  "title": "Tool Display Name",
  "description": "Detailed description of what the tool does",
  "category": "category-name",
  "subcategory": "subcategory-name",
  "featured": false,
  "difficulty": "beginner|intermediate|advanced",
  "lastUpdated": "YYYY-MM-DD",
  "icon": "icon-name-from-library",
  "tags": ["tag1", "tag2", "tag3"],
  "keywords": ["keyword1", "keyword2"],
  "relatedTools": ["related-tool-id1", "related-tool-id2"]
}
```

### 3. Implement Utility Functions

Create utility functions in the `utils/` directory that handle the mathematical operations:

```typescript
// src/app/math/[category]/[tool-name]/utils/tool-utils.ts

export interface Step {
  explanation: string;
  // Other properties specific to your tool
}

export interface Solution {
  steps: Step[];
  result: string | null;
}

export function solveFunction(input: string): Solution {
  // Implementation
}

// Additional utility functions
```

### 4. Create the Main Component

Implement the main interactive component:

```typescript
// src/app/math/[category]/[tool-name]/components/ToolNameComponent.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';
import { PlayControl } from '@/components/math-shared/PlayControl';
import { MathTable } from '@/components/math-shared/MathTable';
// Import your utility functions
import { solveFunction, Step } from '../utils/tool-utils';

export function ToolNameComponent() {
  // State variables
  const [input, setInput] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  
  // Component logic and rendering
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* Component UI */}
    </div>
  );
}
```

### 5. Create the Page Component

Implement the page component that uses the `MathToolHeader`:

```typescript
// src/app/math/[category]/[tool-name]/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { ToolNameComponent } from './components/ToolNameComponent';
import { MathToolHeader } from '@/components/math-shared/MathToolHeader';
import meta from './meta.json';

export const metadata: Metadata = {
  title: `${meta.title} | Math Tools`,
  description: meta.description,
};

export default function ToolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MathToolHeader
        title={meta.title}
        icon={meta.icon}
        category={meta.category}
        subcategory={meta.subcategory}
        difficulty={meta.difficulty}
        description={meta.description}
      />
      
      <div className="mt-8">
        <ToolNameComponent />
      </div>
    </div>
  );
}
```

## Shared Components

Reuse these shared components for consistency:

### 1. MathToolHeader

```typescript
import { MathToolHeader } from '@/components/math-shared/MathToolHeader';

<MathToolHeader
  title={meta.title}
  icon={meta.icon}
  category={meta.category}
  subcategory={meta.subcategory}
  difficulty={meta.difficulty}
  description={meta.description}
/>
```

### 2. PlayControl

For step-by-step solutions with playback:

```typescript
import { PlayControl } from '@/components/math-shared/PlayControl';

<PlayControl
  isPlaying={isPlaying}
  onPlay={handlePlay}
  onPause={handlePause}
  onReset={handleReset}
  onStep={handleNext}
  disabled={steps.length === 0}
/>
```

### 3. ToggleSwitch

For toggling features:

```typescript
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';

<ToggleSwitch
  id="show-history"
  label="Show solution history"
  checked={showHistory}
  onChange={setShowHistory}
/>
```

### 4. MathTable

For displaying solution steps:

```typescript
import { MathTable } from '@/components/math-shared/MathTable';

<MathTable
  data={steps.map((step, index) => ({
    step: index + 1,
    equation: step.equation,
    explanation: step.explanation
  }))}
  columns={[
    { header: 'Step', accessorKey: 'step' },
    { header: 'Equation', accessorKey: 'equation' },
    { header: 'Explanation', accessorKey: 'explanation' }
  ]}
  caption="Complete solution steps"
/>
```

## Best Practices

1. **User Experience**:
   - Provide clear instructions
   - Show step-by-step solutions
   - Include visual representations when possible
   - Handle errors gracefully

2. **Code Organization**:
   - Separate UI logic from mathematical operations
   - Use TypeScript interfaces for type safety
   - Document complex algorithms

3. **Performance**:
   - Optimize heavy calculations
   - Consider using Web Workers for complex computations
   - Use memoization for repeated calculations

4. **Accessibility**:
   - Ensure proper contrast ratios
   - Add aria attributes for screen readers
   - Make controls keyboard accessible

5. **Testing**:
   - Write tests for utility functions
   - Add test cases for edge cases
   - Test different input formats

## Example Implementation

For a practical example, refer to the implementation of these tools:

1. **Linear Equation Solver**: `src/app/math/algebra/equation-solver/`
2. **Polynomial Factorization**: `src/app/math/algebra/factorization/`
3. **Linear Systems Solver**: `src/app/math/algebra/linear-systems/`

These implementations demonstrate the proper structure and coding patterns to follow. 