'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface MathematicalInsightProps {
  title: string;
  content: string;
}

export const MathematicalInsight: React.FC<MathematicalInsightProps> = ({ title, content }) => (
  <div className="bg-blue-950 p-4 rounded-lg mb-4">
    <h3 className="text-lg font-semibold text-blue-200 mb-2 flex items-center">
      <Info className="mr-2 h-5 w-5" />
      {title}
    </h3>
    <p className="text-blue-100 text-sm">{content}</p>
  </div>
);