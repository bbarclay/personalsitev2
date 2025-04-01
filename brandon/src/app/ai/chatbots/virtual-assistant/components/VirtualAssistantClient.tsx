'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false });
const FeaturesPanel = dynamic(() => import('./FeaturesPanel'), { ssr: false });
const HelpPanel = dynamic(() => import('./HelpPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

const VirtualAssistantContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return ({ meta }: { meta: any }) => (
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
  meta: any;
}

export default function VirtualAssistantClient({ meta }: VirtualAssistantClientProps) {
  return <VirtualAssistantContent meta={meta} />;
} 