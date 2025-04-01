import { SymbolPayout } from '../types';
import { symbols } from './symbols';

export const defaultPayouts: SymbolPayout[] = symbols.map(symbol => ({
  symbolId: symbol.id,
  basePayoutMultiplier: symbol.basePayoutMultiplier,
}));

export const calculateLinePayout = (
  symbolId: number,
  matchCount: number,
  betAmount: number,
  payoutMultiplier: number,
  symbolPayouts: SymbolPayout[] = defaultPayouts
): number => {
  if (matchCount < 3) return 0;

  const symbol = symbols.find(s => s.id === symbolId);
  if (!symbol) return 0;

  const symbolPayout = symbolPayouts.find(p => p.symbolId === symbolId) ||
                      defaultPayouts.find(p => p.symbolId === symbolId) ||
                      { basePayoutMultiplier: 1.0 };

  let matchMultiplier = 0;
  switch (matchCount) {
    case 3:
      matchMultiplier = symbol.payout.three;
      break;
    case 4:
      matchMultiplier = symbol.payout.four;
      break;
    case 5:
      matchMultiplier = symbol.payout.five;
      break;
  }

  return betAmount * symbolPayout.basePayoutMultiplier * payoutMultiplier * (matchMultiplier / 100);
};

export const calculateScatterPayout = (
  scatterCount: number,
  betAmount: number,
  payoutMultiplier: number
): number => {
  if (scatterCount < 3) return 0;

  const scatterSymbol = symbols.find(s => s.isScatter);
  if (!scatterSymbol) return 0;

  let matchMultiplier = 0;
  switch (scatterCount) {
    case 3:
      matchMultiplier = scatterSymbol.payout.three;
      break;
    case 4:
      matchMultiplier = scatterSymbol.payout.four;
      break;
    case 5:
      matchMultiplier = scatterSymbol.payout.five;
      break;
  }

  return betAmount * scatterSymbol.basePayoutMultiplier * payoutMultiplier * (matchMultiplier / 100);
};

export const calculateFreeSpins = (
  scatterCount: number,
  freeSpinConfig: { threeScatters: number; fourScatters: number; fiveScatters: number; }
): number => {
  if (scatterCount < 3) return 0;

  switch (scatterCount) {
    case 3:
      return freeSpinConfig.threeScatters;
    case 4:
      return freeSpinConfig.fourScatters;
    case 5:
      return freeSpinConfig.fiveScatters;
    default:
      return 0;
  }
};

export const isJackpotWin = (symbols: number[]): boolean => {
  const jackpotSymbol = symbols.find(s => s === 0); // 7 is the jackpot symbol
  return symbols.length === 5 && symbols.every(s => s === jackpotSymbol);
};

export const calculateTheoreticalRTP = (
  symbolWeights: number[],
  payoutMultiplier: number
): number => {
  // This is a simplified RTP calculation
  const baseRTP = 96; // Base RTP percentage
  return baseRTP * payoutMultiplier;
};
