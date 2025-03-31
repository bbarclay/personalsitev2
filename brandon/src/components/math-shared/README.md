# Math Shared Components

This directory contains standardized components that can be reused across different math tools. Using these shared components ensures a consistent look and behavior throughout the math tools section.

## Available Components

### MathToolHeader

A standardized header for all math tool pages that includes:
- Back link to Math Tools page
- Tool title with icon
- Category and subcategory tags
- Difficulty level indicator
- Tool description

```tsx
import { MathToolHeader } from '@/components/math-shared/MathToolHeader';

<MathToolHeader
  title="Quadratic Equation Solver"
  icon="📊"
  category="Algebra"
  subcategory="Equations"
  difficulty="beginner"
  description="Solve quadratic equations and see step-by-step solutions"
/>
```

### PlayControl

A standardized play/pause control component for interactive simulations:
- Play/pause toggle button
- Step forward button
- Reset button

```tsx
import { PlayControl } from '@/components/math-shared/PlayControl';

<PlayControl
  isPlaying={isPlaying}
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
  onReset={handleReset}
  onStep={handleStep}
  disabled={false}
  hideStepButton={false}
/>
```

### MathTable

A standardized data table component for displaying tabular data:
- Customizable columns with headers
- Support for custom cell renderers
- Optional caption
- Empty state message

```tsx
import { MathTable } from '@/components/math-shared/MathTable';

<MathTable
  data={tableData}
  columns={[
    { header: 'X', accessorKey: 'x' },
    { header: 'Y', accessorKey: 'y' },
    { 
      header: 'Result', 
      accessorKey: 'result',
      cell: (value, row) => <strong>{value}</strong>
    }
  ]}
  caption="Table of values"
  emptyMessage="No data available yet"
/>
```

### ToggleSwitch

A standardized toggle switch component:
- Label and optional description
- Enabled/disabled states
- Accessible design

```tsx
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';

<ToggleSwitch
  id="show-steps"
  label="Show steps"
  checked={showSteps}
  onChange={setShowSteps}
  description="Display step-by-step calculations"
/>
```

## Animation Libraries

For more complex animations and transitions, consider using:

1. **Framer Motion** - Already included in dependencies for smooth animations
   ```tsx
   import { motion } from 'framer-motion';
   
   <motion.div 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5 }}
   >
     Content to animate
   </motion.div>
   ```

2. **GSAP (GreenSock Animation Platform)** - For advanced animations
   ```tsx
   import { useEffect, useRef } from 'react';
   import { gsap } from 'gsap';
   
   const elementRef = useRef(null);
   
   useEffect(() => {
     gsap.to(elementRef.current, { 
       x: 100, 
       duration: 1, 
       ease: "power2.out" 
     });
   }, []);
   
   return <div ref={elementRef}>Element to animate</div>;
   ```

## Adding New Components

When adding new shared components:
1. Place them in this directory
2. Follow the naming convention: `ComponentName.tsx`
3. Add TypeScript interfaces for props
4. Include proper accessibility attributes
5. Support both light and dark mode
6. Update this README with documentation and examples 