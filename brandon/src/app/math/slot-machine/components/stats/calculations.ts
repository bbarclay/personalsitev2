import type { StatRecord } from '../types';

export const calculateWinRate = (totalWins: number, totalSpins: number): number => {
  return totalSpins > 0 ? (totalWins / totalSpins) * 100 : 0;
};

export const calculateExpectedValue = (
  totalPayout: number,
  totalSpins: number,
  betAmount: number
): number => {
  return totalSpins > 0 ? (totalPayout - totalSpins * betAmount) / totalSpins : 0;
};

export const createStatRecord = (
  totalSpins: number,
  totalWins: number,
  totalPayout: number,
  balance: number,
  betAmount: number
): StatRecord => {
  return {
    spin: totalSpins,
    balance,
    winRate: calculateWinRate(totalWins, totalSpins),
    expectedValue: calculateExpectedValue(totalPayout, totalSpins, betAmount),
    totalWins,
    totalSpins,
    totalPayout,
  };
};
