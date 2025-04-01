'use client';

import React, { useEffect, useRef } from 'react';
import { SymbolIcon } from './SymbolIcon';
import { applyRandomAnimation } from '../../reels/animations/random';

interface ReelColumnProps {
  column: number[];
  colIndex: number;
  isSpinning: boolean;
}

export const ReelColumn: React.FC<ReelColumnProps> = ({
  column,
  colIndex,
  isSpinning,
}) => {
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSpinning && reelRef.current) {
      applyRandomAnimation(reelRef.current);
    }
  }, [isSpinning]);

  return (
    <div
      ref={reelRef}
      className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg"
      style={{ minWidth: '100px' }}
    >
      {column.map((symbolId, rowIndex) => (
        <div
          key={`${colIndex}-${rowIndex}`}
          className="w-16 h-16 flex items-center justify-center m-1 bg-gray-700 rounded-lg"
        >
          <SymbolIcon 
            symbolId={symbolId} 
            size={48}
          />
        </div>
      ))}
    </div>
  );
};
