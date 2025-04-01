'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ToolMeta } from '@/types/tool-types';

const CreatePanel = dynamic(() => import('./CreatePanel'), { ssr: false });
const LibraryPanel = dynamic(() => import('./LibraryPanel'), { ssr: false });
const TemplatesPanel = dynamic(() => import('./TemplatesPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

const StoryGeneratorContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return () => (
      <ToolPageLayout
        meta={meta}
        panels={{
          create: CreatePanel,
          library: LibraryPanel,
          templates: TemplatesPanel,
          settings: SettingsPanel,
        }}
      />
    );
  }),
  { ssr: false }
);

interface Props {
  meta: ToolMeta;
}

export function StoryGeneratorClient({ meta }: Props) {
  return <StoryGeneratorContent />;
} 