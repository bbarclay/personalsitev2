export interface SlotMachineProps {
  initialBalance?: number;
  minBet?: number;
  maxBet?: number;
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

export interface WinRecord {
  id: number;
  symbols: number[][];
  amount: number;
  timestamp: Date;
  multiplier: number;
  linesWon: number[];
}

export interface WinLine {
  lineNumber: number;
  positions: Array<{
    reel: number;
    position: number;
  }>;
  color: string;
}

export interface Symbol {
  id: number;
  name: string;
  basePayoutMultiplier: number;
  icon: string;
  color: string;
  isWild?: boolean;
  isScatter?: boolean;
  triggersJackpot?: boolean;
  payout: {
    three: number;
    four: number;
    five: number;
  };
}

export interface Position {
  reel: number;
  position: number;
}

export interface SpinResult {
  win: boolean;
  payout: number;
  symbols: number[][];
  linesWon: number[];
  bonusTriggered: boolean;
  freeSpinsAwarded: number;
  jackpotWon: boolean;
}

export interface SymbolPayout {
  symbolId: number;
  basePayoutMultiplier: number;
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
