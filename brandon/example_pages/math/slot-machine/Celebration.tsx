'use client';

import React from 'react';
import { DollarSign } from 'lucide-react';

interface CelebrationProps {
  lastWinAmount: number;
}

export const Celebration: React.FC<CelebrationProps> = ({ lastWinAmount }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="relative w-full h-full">
        {/* Floating coins animation */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${1 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            <DollarSign className="text-yellow-400" size={24} />
          </div>
        ))}
        
        {/* Win amount display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 rounded-lg p-6 animate-win-pulse">
            <div className="text-4xl font-bold text-yellow-400">
              WIN!
            </div>
            <div className="text-2xl text-white">
              ${lastWinAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
