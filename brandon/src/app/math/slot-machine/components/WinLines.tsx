'use client';

import React from 'react';
import { useGameState } from './GameState';
import { getPaylines } from './utils';

export const WinLines: React.FC = () => {
  const { winRecords } = useGameState();
  const latestWin = winRecords[0];
  const paylines = getPaylines();

  if (!latestWin || !latestWin.linesWon?.length) {
    return null;
  }

  // Match exact dimensions from Reel.tsx
  const REEL_WIDTH = 100; // minWidth from Reel
  const REEL_PADDING = 16; // p-4
  const SYMBOL_SIZE = 64; // w-16
  const SYMBOL_MARGIN = 4; // m-1
  const REEL_GAP = 16; // space-x-4
  const SYMBOL_TOTAL = SYMBOL_SIZE + (SYMBOL_MARGIN * 2); // Total height including margins

  const calculatePosition = (point: { reel: number; position: number }) => {
    // Start from reel padding, add reel position with gaps, then center in symbol
    const x = REEL_PADDING + 
              (point.reel * (REEL_WIDTH + REEL_GAP)) + 
              (SYMBOL_SIZE / 2) + 
              SYMBOL_MARGIN;

    // Start from reel padding, add symbol position, then center in symbol
    const y = REEL_PADDING + 
              (point.position * SYMBOL_TOTAL) + 
              (SYMBOL_SIZE / 2) + 
              SYMBOL_MARGIN;

    return { x, y };
  };

  const createPath = (line: typeof paylines[0]): string => {
    const positions = line.positions.map(calculatePosition);
    return `M ${positions[0].x} ${positions[0].y} ${positions
      .slice(1)
      .map((pos) => `L ${pos.x} ${pos.y}`)
      .join(' ')}`;
  };

  const totalWidth = (REEL_WIDTH * 5) + (REEL_GAP * 4);
  const totalHeight = (REEL_PADDING * 2) + (SYMBOL_TOTAL * 3);

  return (
    <div className="absolute inset-0 flex justify-center">
      <svg
        width={totalWidth}
        height={totalHeight}
        style={{ 
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        {paylines.map((line) => {
          if (!latestWin.linesWon.includes(line.lineNumber)) {
            return null;
          }

          const startPos = calculatePosition(line.positions[0]);

          return (
            <g key={line.lineNumber}>
              <path
                d={createPath(line)}
                stroke={line.color}
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))'
                }}
              />
              <circle
                cx={startPos.x - REEL_PADDING - 5}
                cy={startPos.y}
                r="12"
                fill={line.color}
                className="animate-pulse"
              >
                <text
                  x={startPos.x - REEL_PADDING - 5}
                  y={startPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                >
                  {line.lineNumber}
                </text>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
