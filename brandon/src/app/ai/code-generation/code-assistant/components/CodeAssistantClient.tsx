'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GeneratePanel = dynamic(() => import('./GeneratePanel'), { ssr: false });
const ExplainPanel = dynamic(() => import('./ExplainPanel'), { ssr: false });
const DebugPanel = dynamic(() => import('./DebugPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

const CodeAssistantContent = ({ meta }: { meta: any }) => (
  <ToolPageLayout
    meta={meta}
  >
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

interface CodeAssistantClientProps {
  meta: any;
}

export default function CodeAssistantClient({ meta }: CodeAssistantClientProps) {
  return <CodeAssistantContent meta={meta} />;
}