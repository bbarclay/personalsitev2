'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ToolMeta } from '@/types/tool-types';

const CreatePanel = dynamic(() => import('./CreatePanel'), { ssr: false });
const LibraryPanel = dynamic(() => import('./LibraryPanel'), { ssr: false });
const TemplatesPanel = dynamic(() => import('./TemplatesPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

interface Props {
  meta: ToolMeta;
}

export function StoryGeneratorClient({ meta }: Props) {
  return (
    <ToolPageLayout meta={meta}>
      {({ activeTab }) => {
        switch (activeTab) {
          case 'create':
            return <CreatePanel />;
          case 'library':
            return <LibraryPanel />;
          case 'templates':
            return <TemplatesPanel />;
          case 'settings':
            return <SettingsPanel />;
          default:
            return <CreatePanel />;
        }
      }}
    </ToolPageLayout>
  );
}

