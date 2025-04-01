import { create } from 'zustand';
import { BonusState } from './types';

interface BonusStateActions {
  setFreeSpins: (spins: number) => void;
  addFreeSpins: (spins: number) => void;
  useFreeSpins: () => void;
  setShowBonusGame: (show: boolean) => void;
  setJackpotAmount: (amount: number) => void;
  incrementJackpot: (betAmount: number) => void;
  resetJackpot: () => void;
}

const initialBonusState: BonusState = {
  freeSpins: 0,
  showBonusGame: false,
  jackpotAmount: 50,
};

export const useBonusState = create<BonusState & BonusStateActions>((set) => ({
  ...initialBonusState,
  setFreeSpins: (spins) => set({ freeSpins: spins }),
  addFreeSpins: (spins) => set((state) => ({ freeSpins: state.freeSpins + spins })),
  useFreeSpins: () => set((state) => ({ freeSpins: Math.max(0, state.freeSpins - 1) })),
  setShowBonusGame: (show) => set({ showBonusGame: show }),
  setJackpotAmount: (amount) => set({ jackpotAmount: amount }),
  incrementJackpot: (betAmount) => set((state) => ({
    jackpotAmount: state.jackpotAmount + betAmount * 0.01
  })),
  resetJackpot: () => set({ jackpotAmount: 50 }),
}));
