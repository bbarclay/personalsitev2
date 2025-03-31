"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import dynamic from 'next/dynamic';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Dynamically import components
const AnalyzePanel = dynamic(() => import('./components/AnalyzePanel'), { ssr: false });
const HistoryPanel = dynamic(() => import('./components/HistoryPanel'), { ssr: false });
const ReportsPanel = dynamic(() => import('./components/ReportsPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Create dynamic panel component
const SentimentAnalyzerContent = createDynamicPanelComponent({
  analyze: AnalyzePanel,
  history: HistoryPanel,
  reports: ReportsPanel,
  settings: SettingsPanel
});

export default function SentimentAnalyzerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <SentimentAnalyzerContent />
    </ToolPageLayout>
  );
}