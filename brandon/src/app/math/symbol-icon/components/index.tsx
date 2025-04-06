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

const SymbolIcon: React.FC<SymbolIconProps> = ({
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

const SymbolIconDemo = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Symbol Icon Library</h2>
      <p className="mb-4">A collection of slot machine symbols for use in game interfaces.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {symbols.map(symbol => (
          <div key={symbol.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center">
            <SymbolIcon symbolId={symbol.id} size={48} />
            <div className="mt-2 text-center">
              <div className="font-medium">{symbol.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">ID: {symbol.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymbolIconDemo;
