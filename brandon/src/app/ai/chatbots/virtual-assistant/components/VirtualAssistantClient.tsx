'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false });
const FeaturesPanel = dynamic(() => import('./FeaturesPanel'), { ssr: false });
const HelpPanel = dynamic(() => import('./HelpPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

const VirtualAssistantContent = ({ meta }: { meta: any }) => (
  <ToolPageLayout
    meta={meta}
  >
    {({ activeTab }) => {
      switch (activeTab) {
        case 'chat':
          return <ChatPanel />;
        case 'features':
          return <FeaturesPanel />;
        case 'help':
          return <HelpPanel />;
        case 'settings':
          return <SettingsPanel />;
        default:
          return <ChatPanel />;
      }
    }}
  </ToolPageLayout>
);

interface VirtualAssistantClientProps {
  meta: any;
}

export default function VirtualAssistantClient({ meta }: VirtualAssistantClientProps) {
  return <VirtualAssistantContent meta={meta} />;
}