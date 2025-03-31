"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const ChatPanel = dynamic(() => import('./components/ChatPanel'), { ssr: false });
const FeaturesPanel = dynamic(() => import('./components/FeaturesPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });
const HelpPanel = dynamic(() => import('./components/HelpPanel'), { ssr: false });

// Create dynamic panel component
const VirtualAssistantContent = createDynamicPanelComponent({
  chat: ChatPanel,
  features: FeaturesPanel,
  settings: SettingsPanel,
  help: HelpPanel
});

export default function VirtualAssistantPage() {
  return (
    <ToolPageLayout meta={meta}>
      <VirtualAssistantContent />
    </ToolPageLayout>
  );
}