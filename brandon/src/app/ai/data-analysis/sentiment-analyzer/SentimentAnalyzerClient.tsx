'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AnalyzePanel = dynamic(() => import('./components/AnalyzePanel'), { ssr: false });
const HistoryPanel = dynamic(() => import('./components/HistoryPanel'), { ssr: false });
const ReportsPanel = dynamic(() => import('./components/ReportsPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

interface SentimentAnalyzerClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function SentimentAnalyzerClient({ meta }: SentimentAnalyzerClientProps) {
  return (
    <ToolPageLayout meta={meta}>
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
}