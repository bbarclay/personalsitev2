'use client';

import React from 'react';
// import { symbols } from '@/components/math/slot-machine/utils';

// Placeholder symbols data since the original import is missing
const symbols = [
  { id: 1, name: 'Cherry', icon: '🍒', color: '#ff0000' },
  { id: 2, name: 'Bell', icon: '🔔', color: '#ffcc00' },
  { id: 3, name: 'Seven', icon: '7️⃣', color: '#00ff00' },
  { id: 4, name: 'Wild', icon: '⭐', color: '#ff00ff' }
];

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
