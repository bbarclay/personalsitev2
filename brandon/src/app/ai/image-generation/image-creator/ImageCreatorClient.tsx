'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CreatePanel = dynamic(() => import('./components/CreatePanel'), { ssr: false });
const GalleryPanel = dynamic(() => import('./components/GalleryPanel'), { ssr: false });
const StylesPanel = dynamic(() => import('./components/StylesPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

// Import ToolPageLayout directly
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';

interface ImageCreatorClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function ImageCreatorClient({ meta }: ImageCreatorClientProps) {
  return (
    <ToolPageLayout meta={meta}>
      {({ activeTab }) => {
        switch (activeTab) {
          case 'create':
            return <CreatePanel />;
          case 'gallery':
            return <GalleryPanel />;
          case 'styles':
            return <StylesPanel />;
          case 'settings':
            return <SettingsPanel />;
          default:
            return <CreatePanel />;
        }
      }}
    </ToolPageLayout>
  );
}