'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AnalyzePanel = dynamic(() => import('./AnalyzePanel'), { ssr: false });
const HistoryPanel = dynamic(() => import('./HistoryPanel'), { ssr: false });
const ReportsPanel = dynamic(() => import('./ReportsPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

const SentimentAnalyzerContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return ({ meta }: { meta: any }) => (
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
  meta: any;
}

export default function SentimentAnalyzerClient({ meta }: SentimentAnalyzerClientProps) {
  return <SentimentAnalyzerContent meta={meta} />;
} 