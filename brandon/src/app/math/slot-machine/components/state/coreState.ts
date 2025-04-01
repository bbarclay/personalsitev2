import { create } from 'zustand';
import type { CoreGameState, StatRecord } from './types';

interface CoreGameActions {
  setReels: (reels: number[][]) => void;
  setIsSpinning: (spinning: boolean) => void;
  setAutoPlay: (auto: boolean) => void;
  setSpinSpeed: (speed: number) => void;
  setBalance: (balance: number | ((prev: number) => number)) => void;
  setIsLoading: (loading: boolean) => void;
  setTotalSpins: (spins: number | ((prev: number) => number)) => void;
  setTotalWins: (wins: number | ((prev: number) => number)) => void;
  setTotalPayout: (payout: number | ((prev: number) => number)) => void;
  setStats: (stats: StatRecord[] | ((prev: StatRecord[]) => StatRecord[])) => void;
}

const initialCoreState: CoreGameState = {
  reels: [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
  ],
  isSpinning: false,
  autoPlay: false,
  spinSpeed: 500,
  balance: 1000,
  isLoading: false,
  totalSpins: 0,
  totalWins: 0,
  totalPayout: 0,
  stats: [],
};

export const useCoreGameState = create<CoreGameState & CoreGameActions>((set) => ({
  ...initialCoreState,
  setReels: (reels) => set({ reels }),
  setIsSpinning: (isSpinning) => set({ isSpinning }),
  setAutoPlay: (autoPlay) => set({ autoPlay }),
  setSpinSpeed: (spinSpeed) => set({ spinSpeed }),
  setBalance: (balance) => set((state) => ({
    balance: typeof balance === 'function' ? balance(state.balance) : balance
  })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTotalSpins: (spins) => set((state) => ({
    totalSpins: typeof spins === 'function' ? spins(state.totalSpins) : spins
  })),
  setTotalWins: (wins) => set((state) => ({
    totalWins: typeof wins === 'function' ? wins(state.totalWins) : wins
  })),
  setTotalPayout: (payout) => set((state) => ({
    totalPayout: typeof payout === 'function' ? payout(state.totalPayout) : payout
  })),
  setStats: (stats) => set((state) => ({
    stats: typeof stats === 'function' ? stats(state.stats) : stats
  })),
}));
