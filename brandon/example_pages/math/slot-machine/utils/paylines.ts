import type { WinLine, Position } from '../types';

export const paylines: WinLine[] = [
  // Horizontal lines (more visible colors)
  {
    lineNumber: 1,
    positions: [
      { reel: 0, position: 0 },
      { reel: 1, position: 0 },
      { reel: 2, position: 0 },
      { reel: 3, position: 0 },
      { reel: 4, position: 0 }
    ],
    color: '#FF3B30' // Bright red
  },
  {
    lineNumber: 2,
    positions: [
      { reel: 0, position: 1 },
      { reel: 1, position: 1 },
      { reel: 2, position: 1 },
      { reel: 3, position: 1 },
      { reel: 4, position: 1 }
    ],
    color: '#34C759' // Bright green
  },
  {
    lineNumber: 3,
    positions: [
      { reel: 0, position: 2 },
      { reel: 1, position: 2 },
      { reel: 2, position: 2 },
      { reel: 3, position: 2 },
      { reel: 4, position: 2 }
    ],
    color: '#007AFF' // Bright blue
  },
  // V-shaped lines
  {
    lineNumber: 4,
    positions: [
      { reel: 0, position: 0 },
      { reel: 1, position: 1 },
      { reel: 2, position: 2 },
      { reel: 3, position: 1 },
      { reel: 4, position: 0 }
    ],
    color: '#FFD60A' // Bright yellow
  },
  {
    lineNumber: 5,
    positions: [
      { reel: 0, position: 2 },
      { reel: 1, position: 1 },
      { reel: 2, position: 0 },
      { reel: 3, position: 1 },
      { reel: 4, position: 2 }
    ],
    color: '#FF2D55' // Pink
  },
  // Zigzag lines
  {
    lineNumber: 6,
    positions: [
      { reel: 0, position: 0 },
      { reel: 1, position: 1 },
      { reel: 2, position: 0 },
      { reel: 3, position: 1 },
      { reel: 4, position: 0 }
    ],
    color: '#5856D6' // Purple
  },
  {
    lineNumber: 7,
    positions: [
      { reel: 0, position: 2 },
      { reel: 1, position: 1 },
      { reel: 2, position: 2 },
      { reel: 3, position: 1 },
      { reel: 4, position: 2 }
    ],
    color: '#FF9500' // Orange
  },
  // W-shaped line
  {
    lineNumber: 8,
    positions: [
      { reel: 0, position: 0 },
      { reel: 1, position: 2 },
      { reel: 2, position: 0 },
      { reel: 3, position: 2 },
      { reel: 4, position: 0 }
    ],
    color: '#64D2FF' // Light blue
  },
  // New diagonal lines
  {
    lineNumber: 9,
    positions: [
      { reel: 0, position: 0 },
      { reel: 1, position: 0 },
      { reel: 2, position: 1 },
      { reel: 3, position: 2 },
      { reel: 4, position: 2 }
    ],
    color: '#BF5AF2' // Purple
  },
  {
    lineNumber: 10,
    positions: [
      { reel: 0, position: 2 },
      { reel: 1, position: 2 },
      { reel: 2, position: 1 },
      { reel: 3, position: 0 },
      { reel: 4, position: 0 }
    ],
    color: '#30D158' // Green
  }
];

export const getPaylineSymbols = (reels: number[][], line: WinLine): number[] => {
  return line.positions.map(pos => reels[pos.reel][pos.position]);
};

export const countConsecutiveMatches = (symbols: number[]): number => {
  let count = 1;
  const firstSymbol = symbols[0];
  
  for (let i = 1; i < symbols.length; i++) {
    if (symbols[i] === firstSymbol) {
      count++;
    } else {
      break;
    }
  }
  
  return count;
};

export const getPaylines = (): WinLine[] => paylines;

export const getPaylinePositions = (lineNumber: number): Position[] | undefined => {
  const line = paylines.find(l => l.lineNumber === lineNumber);
  return line?.positions;
};

// Helper function to check if a payline is valid for a specific set of reels
export const isPaylineValid = (reels: number[][], line: WinLine): boolean => {
  const symbols = getPaylineSymbols(reels, line);
  return countConsecutiveMatches(symbols) >= 3;
};

// Helper function to get all winning paylines for a set of reels
export const getWinningPaylines = (reels: number[][]): number[] => {
  return paylines
    .filter(line => isPaylineValid(reels, line))
    .map(line => line.lineNumber);
};
