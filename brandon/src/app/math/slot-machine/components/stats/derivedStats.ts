import { GameStats } from './types';

export const calculateDerivedStats = (baseStats: GameStats): GameStats => {
  const averagePayout = baseStats.totalSpins > 0 
    ? baseStats.totalPayout / baseStats.totalSpins 
    : 0;

  const winPercentage = baseStats.totalSpins > 0 
    ? (baseStats.totalWins / baseStats.totalSpins) * 100 
    : 0;

  const returnToPlayer = baseStats.totalSpins > 0 
    ? (baseStats.totalPayout / (baseStats.totalSpins * 1)) * 100 // Assuming bet size is 1
    : 0;

  return {
    ...baseStats,
    averagePayout,
    winPercentage,
    returnToPlayer,
  };
};
