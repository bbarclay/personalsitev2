'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GeneratePanel = dynamic(() => import('./components/GeneratePanel'), { ssr: false });
const ExplainPanel = dynamic(() => import('./components/ExplainPanel'), { ssr: false });
const DebugPanel = dynamic(() => import('./components/DebugPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

const CodeAssistantContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return () => (
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
  meta: any; // Replace 'any' with proper type if available
}

export default function CodeAssistantClient({ meta }: CodeAssistantClientProps) {
  return <CodeAssistantContent />;
} 