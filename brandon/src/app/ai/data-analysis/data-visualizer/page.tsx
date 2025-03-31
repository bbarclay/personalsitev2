"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const VisualizePanel = dynamic(() => import('./components/VisualizePanel'), { ssr: false });
const DataPanel = dynamic(() => import('./components/DataPanel'), { ssr: false });
const GalleryPanel = dynamic(() => import('./components/GalleryPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Create dynamic panel component
const DataVisualizerContent = createDynamicPanelComponent({
  visualize: VisualizePanel,
  data: DataPanel,
  gallery: GalleryPanel,
  settings: SettingsPanel
});

export default function DataVisualizerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <DataVisualizerContent />
    </ToolPageLayout>
  );
}