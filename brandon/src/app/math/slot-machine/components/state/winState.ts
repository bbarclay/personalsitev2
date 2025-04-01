import { create } from 'zustand';
import { WinState, WinRecord } from './types';

interface WinStateActions {
  setShowCelebration: (show: boolean) => void;
  setLastWinAmount: (amount: number) => void;
  setWinningLines: (lines: number[]) => void;
  setShowWinLines: (show: boolean) => void;
  setFlashingReels: (flashing: boolean) => void;
  addWinRecord: (record: Omit<WinRecord, 'id'>) => void;
}

const initialWinState: WinState & { winRecords: WinRecord[] } = {
  showCelebration: false,
  lastWinAmount: 0,
  winningLines: [],
  showWinLines: false,
  flashingReels: false,
  winRecords: [],
};

let winCount = 0;

export const useWinState = create<(WinState & { winRecords: WinRecord[] }) & WinStateActions>((set) => ({
  ...initialWinState,
  setShowCelebration: (show) => set({ showCelebration: show }),
  setLastWinAmount: (amount) => set({ lastWinAmount: amount }),
  setWinningLines: (lines) => set({ winningLines: lines }),
  setShowWinLines: (show) => set({ showWinLines: show }),
  setFlashingReels: (flashing) => set({ flashingReels: flashing }),
  addWinRecord: (record) => set((state) => ({
    winRecords: [{ ...record, id: ++winCount }, ...state.winRecords].slice(0, 10)
  })),
}));
