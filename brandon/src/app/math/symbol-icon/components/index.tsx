'use client';

import React from 'react';
import { symbols } from '@/app/math/utils/symbols';

interface SymbolIconProps {
  symbolId: number;
  size?: number;
  className?: string;
}

export const SymbolIcon: React.FC<SymbolIconProps> = ({
  symbolId,
  size = 24,
  className = ''
}) => {
  const symbol = symbols.find(s => s.id === symbolId);
  if (!symbol) return null;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        color: symbol.color,
        fontSize: size * 0.8,
        lineHeight: `${size}px`
      }}
    >
      {symbol.icon}
    </div>
  );
};


export default SymbolIcon;
