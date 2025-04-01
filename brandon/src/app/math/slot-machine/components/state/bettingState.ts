import { create } from 'zustand';
import { BettingState } from './types';

interface BettingActions {
  setBetAmount: (amount: number) => void;
  validateBet: (amount: number) => boolean;
  increaseBet: () => void;
  decreaseBet: () => void;
}

const initialBettingState: BettingState = {
  betAmount: 1,
  minBet: 1,
  maxBet: 100,
  initialBalance: 1000,
};

export const useBettingState = create<BettingState & BettingActions>((set, get) => ({
  ...initialBettingState,
  setBetAmount: (amount) => set({ betAmount: amount }),
  validateBet: (amount) => {
    const { minBet, maxBet } = get();
    return amount >= minBet && amount <= maxBet;
  },
  increaseBet: () => {
    const { betAmount, maxBet } = get();
    const newBet = Math.min(betAmount * 2, maxBet);
    set({ betAmount: newBet });
  },
  decreaseBet: () => {
    const { betAmount, minBet } = get();
    const newBet = Math.max(betAmount / 2, minBet);
    set({ betAmount: newBet });
  },
}));
