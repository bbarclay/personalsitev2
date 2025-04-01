'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AnalyzePanel = dynamic(() => import('./components/AnalyzePanel'), { ssr: false });
const HistoryPanel = dynamic(() => import('./components/HistoryPanel'), { ssr: false });
const ReportsPanel = dynamic(() => import('./components/ReportsPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

const SentimentAnalyzerContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return () => (
      <ToolPageLayout
        meta={meta}
        panels={{
          analyze: AnalyzePanel,
          history: HistoryPanel,
          reports: ReportsPanel,
          settings: SettingsPanel,
        }}
      />
    );
  }),
  { ssr: false }
);

interface SentimentAnalyzerClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function SentimentAnalyzerClient({ meta }: SentimentAnalyzerClientProps) {
  return <SentimentAnalyzerContent />;
} 