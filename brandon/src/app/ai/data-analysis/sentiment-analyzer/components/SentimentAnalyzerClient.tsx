'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AnalyzePanel = dynamic(() => import('./AnalyzePanel'), { ssr: false });
const HistoryPanel = dynamic(() => import('./HistoryPanel'), { ssr: false });
const ReportsPanel = dynamic(() => import('./ReportsPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

const SentimentAnalyzerContent = ({ meta }: { meta: any }) => (
  <ToolPageLayout
    meta={meta}
  >
    {({ activeTab }) => {
      switch (activeTab) {
        case 'analyze':
          return <AnalyzePanel />;
        case 'history':
          return <HistoryPanel />;
        case 'reports':
          return <ReportsPanel />;
        case 'settings':
          return <SettingsPanel />;
        default:
          return <AnalyzePanel />;
      }
    }}
  </ToolPageLayout>
);

interface SentimentAnalyzerClientProps {
  meta: any;
}

export default function SentimentAnalyzerClient({ meta }: SentimentAnalyzerClientProps) {
  return <SentimentAnalyzerContent meta={meta} />;
}