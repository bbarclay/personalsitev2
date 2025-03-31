"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

import dynamic from 'next/dynamic';

const CreatePanel = dynamic(();
const GalleryPanel = dynamic(();
const StylesPanel = dynamic(();
const SettingsPanel = dynamic(();

const CreatePanel = dynamic(() => import('./components/CreatePanel'), { ssr: false });


const GalleryPanel = dynamic(() => import('./components/GalleryPanel'), { ssr: false });


const StylesPanel = dynamic(() => import('./components/StylesPanel'), { ssr: false });


const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });



// Create dynamic panel component with placeholders
const ImageCreatorContent = createDynamicPanelComponent({
  solver: () => <div>Solver panel content</div>,
  explanation: () => <div>Explanation panel content</div>,
  applications: () => <div>Applications panel content</div>,
  resources: () => <div>Resources panel content</div>
});

export default function ImageCreatorPage() {
  return (
    <ToolPageLayout meta={meta}>
      <div>Tool content</div>
    </ToolPageLayout>
  );
}