import React from 'react';
import { getMathTools } from './utils/getMathTools';
import { ToolsPage } from '../components/shared/ToolsPage';

// Make this a server component
export default async function MathPage() {
  // Get tools on the server
  const mathTools = getMathTools();

  return (
    <ToolsPage
      initialTools={mathTools}
      title="Math Tools & Calculators"
      description="Explore our collection of interactive mathematical tools and calculators"
      type="math"
    />
  );
} 