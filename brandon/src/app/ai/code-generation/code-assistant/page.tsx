"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const GeneratePanel = dynamic(() => import('./components/GeneratePanel'), { ssr: false });
const ExplainPanel = dynamic(() => import('./components/ExplainPanel'), { ssr: false });
const DebugPanel = dynamic(() => import('./components/DebugPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Create dynamic panel component
const CodeAssistantContent = createDynamicPanelComponent({
  generate: GeneratePanel,
  explain: ExplainPanel,
  debug: DebugPanel,
  settings: SettingsPanel
});

export default function CodeAssistantPage() {
  return (
    <ToolPageLayout meta={meta}>
      <CodeAssistantContent />
    </ToolPageLayout>
  );
}