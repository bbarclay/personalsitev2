import type { StatRecord, WinRecord } from '../types';

export const getAverageWinAmount = (winRecords: WinRecord[]): number => {
  if (winRecords.length === 0) return 0;
  const total = winRecords.reduce((sum, record) => sum + record.amount, 0);
  return total / winRecords.length;
};

export const getHighestWin = (winRecords: WinRecord[]): number => {
  if (winRecords.length === 0) return 0;
  return Math.max(...winRecords.map(record => record.amount));
};

export const getWinStreak = (stats: StatRecord[]): number => {
  let currentStreak = 0;
  let maxStreak = 0;

  for (let i = stats.length - 1; i >= 0; i--) {
    const currentWins = stats[i].totalWins;
    const previousWins = i > 0 ? stats[i - 1].totalWins : 0;
    
    if (currentWins > previousWins) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
};

export const getReturnToPlayer = (stats: StatRecord[]): number => {
  if (stats.length === 0) return 0;
  const lastStat = stats[stats.length - 1];
  return (lastStat.totalPayout / (lastStat.totalSpins * lastStat.balance)) * 100;
};
