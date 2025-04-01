'use client';

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';

// Dynamically import components
const VisualizePanel = dynamic(() => import('./VisualizePanel'), { ssr: false });
const DataPanel = dynamic(() => import('./DataPanel'), { ssr: false });
const GalleryPanel = dynamic(() => import('./GalleryPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

// Create dynamic panel component
const DataVisualizerContent = createDynamicPanelComponent({
  visualize: VisualizePanel,
  data: DataPanel,
  gallery: GalleryPanel,
  settings: SettingsPanel
});

interface DataVisualizerClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function DataVisualizerClient({ meta }: DataVisualizerClientProps) {
  return (
    <ToolPageLayout meta={meta}>
      <DataVisualizerContent />
    </ToolPageLayout>
  );
} 