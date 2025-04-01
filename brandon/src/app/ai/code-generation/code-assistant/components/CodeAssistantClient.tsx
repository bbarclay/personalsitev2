'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GeneratePanel = dynamic(() => import('./GeneratePanel'), { ssr: false });
const ExplainPanel = dynamic(() => import('./ExplainPanel'), { ssr: false });
const DebugPanel = dynamic(() => import('./DebugPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

const CodeAssistantContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return ({ meta }: { meta: any }) => (
      <ToolPageLayout
        meta={meta}
        panels={{
          generate: GeneratePanel,
          explain: ExplainPanel,
          debug: DebugPanel,
          settings: SettingsPanel,
        }}
      />
    );
  }),
  { ssr: false }
);

interface CodeAssistantClientProps {
  meta: any;
}

export default function CodeAssistantClient({ meta }: CodeAssistantClientProps) {
  return <CodeAssistantContent meta={meta} />;
} 