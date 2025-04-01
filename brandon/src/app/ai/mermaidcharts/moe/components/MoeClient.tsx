'use client';

import React from 'react';
import { AIToolWrapper } from '@/app/ai/components/AIToolWrapper';
import MoeContent from './MoeContent';
import type { AIPageMeta } from '@/app/ai/types';

interface MoeClientProps {
  meta: AIPageMeta;
}

const MoeClient: React.FC<MoeClientProps> = ({ meta }) => {
  return (
    <AIToolWrapper meta={meta}>
      <MoeContent />
    </AIToolWrapper>
  );
};

export default MoeClient; 