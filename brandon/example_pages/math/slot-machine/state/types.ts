export interface CoreGameState {
  reels: number[][];
  isSpinning: boolean;
  autoPlay: boolean;
  spinSpeed: number;
  balance: number;
  isLoading: boolean;
  totalSpins: number;
  totalWins: number;
  totalPayout: number;
  stats: StatRecord[];
}

export interface BettingState {
  betAmount: number;
  minBet: number;
  maxBet: number;
  initialBalance: number;
}

export interface WinState {
  showCelebration: boolean;
  lastWinAmount: number;
  winningLines: number[];
  showWinLines: boolean;
  flashingReels: boolean;
  winRecords: WinRecord[];
}

export interface BonusState {
  freeSpins: number;
  showBonusGame: boolean;
  jackpotAmount: number;
}

export interface GameConfig {
  symbolWeights: number[];
  freeSpinConfig: {
    threeScatters: number;
    fourScatters: number;
    fiveScatters: number;
  };
  volatility: 'low' | 'medium' | 'high';
  payoutMultiplier: number;
}

export interface WinRecord {
  id?: number;
  symbols: number[][];
  amount: number;
  timestamp: Date;
  multiplier: number;
  linesWon: number[];
}

export interface StatRecord {
  spin: number;
  balance: number;
  winRate: number;
  expectedValue: number;
  totalWins: number;
  totalSpins: number;
  totalPayout: number;
}

// Combined state type for useGameState hook compatibility
export interface GameStateType extends 
  CoreGameState,
  BettingState,
  WinState,
  BonusState {
  gameConfig: GameConfig;
}

export interface GameStateActions {
  setReels: (reels: number[][]) => void;
  setIsSpinning: (spinning: boolean) => void;
  setAutoPlay: (auto: boolean) => void;
  setSpinSpeed: (speed: number) => void;
  setBalance: (balance: number | ((prev: number) => number)) => void;
  setBetAmount: (amount: number) => void;
  setShowBonusGame: (show: boolean) => void;
  setPayoutMultiplier: (multiplier: number) => void;
  setGameConfig: (config: Partial<GameConfig>) => void;
  handleSpin: () => void;
  handleReset: () => void;
  setIsLoading: (loading: boolean) => void;
  setTotalSpins: (spins: number | ((prev: number) => number)) => void;
  setTotalWins: (wins: number | ((prev: number) => number)) => void;
  setTotalPayout: (payout: number | ((prev: number) => number)) => void;
  setStats: (stats: StatRecord[] | ((prev: StatRecord[]) => StatRecord[])) => void;
}

export type GameStateContextType = GameStateType & GameStateActions;
