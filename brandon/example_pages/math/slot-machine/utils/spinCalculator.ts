import type { SpinResult, SymbolPayout } from '../types';
import { paylines } from './paylines';
import { getPaylineSymbols, countConsecutiveMatches } from './paylines';
import { calculateLinePayout, calculateScatterPayout, calculateFreeSpins } from './payouts';
import { defaultPayouts } from './payouts';

export const calculateSpinResult = (
  reels: number[][],
  betAmount: number,
  payoutMultiplier: number,
  symbolPayouts: SymbolPayout[] = defaultPayouts,
  freeSpinConfig = { threeScatters: 3, fourScatters: 5, fiveScatters: 10 }
): SpinResult => {
  let totalPayout = 0;
  let win = false;
  const linesWon: number[] = [];
  let bonusTriggered = false;
  let freeSpinsAwarded = 0;
  let jackpotWon = false;

  // Check each payline
  paylines.forEach(line => {
    const symbols = getPaylineSymbols(reels, line);
    const matchCount = countConsecutiveMatches(symbols);

    if (matchCount >= 3) {
      win = true;
      linesWon.push(line.lineNumber);

      const linePayout = calculateLinePayout(
        symbols[0],
        matchCount,
        betAmount,
        payoutMultiplier,
        symbolPayouts
      );
      totalPayout += linePayout;

      // Check for jackpot
      if (symbols[0] === 0 && matchCount === 5) {
        jackpotWon = true;
        totalPayout *= 2; // Double payout for jackpot
      }
    }
  });

  // Check for scatter symbols (Bell - id: 6)
  const allSymbols = reels.flat();
  const scatterCount = allSymbols.filter(symbol => symbol === 6).length;

  if (scatterCount >= 3) {
    bonusTriggered = true;
    freeSpinsAwarded = calculateFreeSpins(scatterCount, freeSpinConfig);

    // Add scatter payout
    const scatterPayout = calculateScatterPayout(
      scatterCount,
      betAmount,
      payoutMultiplier
    );
    totalPayout += scatterPayout;
  }

  return {
    win,
    payout: totalPayout,
    symbols: reels,
    linesWon,
    bonusTriggered,
    freeSpinsAwarded,
    jackpotWon
  };
};

export const validateSpinResult = (result: SpinResult): boolean => {
  // Validate result structure
  if (!result || typeof result !== 'object') return false;

  // Validate required properties
  if (typeof result.win !== 'boolean') return false;
  if (typeof result.payout !== 'number') return false;
  if (!Array.isArray(result.symbols)) return false;
  if (!Array.isArray(result.linesWon)) return false;
  if (typeof result.bonusTriggered !== 'boolean') return false;
  if (typeof result.freeSpinsAwarded !== 'number') return false;
  if (typeof result.jackpotWon !== 'boolean') return false;

  // Validate reels structure
  if (result.symbols.length !== 5) return false;
  if (!result.symbols.every(reel => Array.isArray(reel) && reel.length === 3)) return false;

  return true;
};
