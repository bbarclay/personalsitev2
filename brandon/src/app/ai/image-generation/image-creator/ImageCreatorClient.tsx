'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CreatePanel = dynamic(() => import('./components/CreatePanel'), { ssr: false });
const GalleryPanel = dynamic(() => import('./components/GalleryPanel'), { ssr: false });
const StylesPanel = dynamic(() => import('./components/StylesPanel'), { ssr: false });
const SettingsPanel = dynamic(() => import('./components/SettingsPanel'), { ssr: false });

const ImageCreatorContent = dynamic(() => 
  import('@/components/layouts/ToolPageLayout').then((mod) => {
    const ToolPageLayout = mod.default;
    return () => (
      <ToolPageLayout
        meta={meta}
        panels={{
          create: CreatePanel,
          gallery: GalleryPanel,
          styles: StylesPanel,
          settings: SettingsPanel,
        }}
      />
    );
  }),
  { ssr: false }
);

interface ImageCreatorClientProps {
  meta: any; // Replace 'any' with proper type if available
}

export default function ImageCreatorClient({ meta }: ImageCreatorClientProps) {
  return <ImageCreatorContent />;
} 