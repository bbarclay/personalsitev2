'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ChatPanel = dynamic(() => import('./components/ChatPanel'), { ssr: false });
const FeaturesPanel = dynamic(() => import('./components/FeaturesPanel'), { ssr: false });
const HelpPanel = dynamic(() => import('./components/HelpPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

interface VirtualAssistantClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function VirtualAssistantClient({ meta }: VirtualAssistantClientProps) {
  return (
    <ToolPageLayout meta={meta}>
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
}