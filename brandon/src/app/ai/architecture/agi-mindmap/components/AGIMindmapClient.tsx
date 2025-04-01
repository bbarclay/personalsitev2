'use client';

import React from 'react';
import { AIToolWrapper } from '@/app/ai/components/AIToolWrapper';
import AGIMindmapContent from './AGIMindmapContent';
import type { AIPageMeta } from '@/app/ai/types';

interface AGIMindmapClientProps {
  meta: AIPageMeta;
}

const AGIMindmapClient: React.FC<AGIMindmapClientProps> = ({ meta }) => {
  return (
    <AIToolWrapper meta={meta}>
      <AGIMindmapContent />
    </AIToolWrapper>
  );
};

export default AGIMindmapClient; 