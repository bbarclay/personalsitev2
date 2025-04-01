import { GameStats, SpinStats } from './types';

const initialGameStats: GameStats = {
  totalSpins: 0,
  totalWins: 0,
  totalLosses: 0,
  totalPayout: 0,
  maxPayout: 0,
  minPayout: 0,
  averagePayout: 0,
  winPercentage: 0,
  returnToPlayer: 0,
};

export const calculateBaseStats = (currentStats: GameStats, spinResult: SpinStats): GameStats => {
  const newStats = { ...currentStats };
  newStats.totalSpins = currentStats.totalSpins + 1;
  
  if (spinResult.isWin) {
    newStats.totalWins = currentStats.totalWins + 1;
  } else {
    newStats.totalLosses = currentStats.totalLosses + 1;
  }

  newStats.totalPayout = currentStats.totalPayout + spinResult.currentPayout;
  newStats.maxPayout = Math.max(currentStats.maxPayout, spinResult.currentPayout);
  newStats.minPayout = Math.min(currentStats.minPayout || spinResult.currentPayout, spinResult.currentPayout);
  
  return newStats;
};

export { initialGameStats };
