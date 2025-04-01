'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ChatPanel = dynamic(() => import('./components/ChatPanel'), { ssr: false });
const FeaturesPanel = dynamic(() => import('./components/FeaturesPanel'), { ssr: false });
const HelpPanel = dynamic(() => import('./components/HelpPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

const VirtualAssistantContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return () => (
      <ToolPageLayout
        meta={meta}
        panels={{
          chat: ChatPanel,
          features: FeaturesPanel,
          help: HelpPanel,
          settings: SettingsPanel,
        }}
      />
    );
  }),
  { ssr: false }
);

interface VirtualAssistantClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function VirtualAssistantClient({ meta }: VirtualAssistantClientProps) {
  return <VirtualAssistantContent />;
} 