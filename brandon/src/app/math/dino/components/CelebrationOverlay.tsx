import React from 'react';
import type { ShowCelebration } from '../types';

interface CelebrationOverlayProps {
  celebration: ShowCelebration | false;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ celebration }) => {
  if (!celebration) return null;

  const celebrationColors = ['#4CAF50', '#FFC107', '#FF5722', '#673AB7'];

  return (
    <div className="
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-black/80 text-white
      px-8 py-4 rounded-lg z-50
      text-center text-2xl font-bold
      animate-fadeIn
    ">
      {celebration.message}

      {/* Sparkle Effects */}
      <div className="absolute inset-[-20px] pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="sparkle absolute w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: celebrationColors[i % celebrationColors.length],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
