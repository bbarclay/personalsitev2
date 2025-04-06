'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GeneratePanel = dynamic(() => import('./components/GeneratePanel'), { ssr: false });
const ExplainPanel = dynamic(() => import('./components/ExplainPanel'), { ssr: false });
const DebugPanel = dynamic(() => import('./components/DebugPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

interface CodeAssistantClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function CodeAssistantClient({ meta }: CodeAssistantClientProps) {
  return (
    <ToolPageLayout meta={meta}>
      {({ activeTab }) => {
        switch (activeTab) {
          case 'generate':
            return <GeneratePanel />;
          case 'explain':
            return <ExplainPanel />;
          case 'debug':
            return <DebugPanel />;
          case 'settings':
            return <SettingsPanel />;
          default:
            return <GeneratePanel />;
        }
      }}
    </ToolPageLayout>
  );
}