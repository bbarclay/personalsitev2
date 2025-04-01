export interface GameStats {
  totalSpins: number;
  totalWins: number;
  totalLosses: number;
  totalPayout: number;
  maxPayout: number;
  minPayout: number;
  averagePayout: number;
  winPercentage: number;
  returnToPlayer: number;
}

export interface SpinStats {
  currentPayout: number;
  isWin: boolean;
  spinNumber: number;
}
