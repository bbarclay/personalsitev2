import { create } from 'zustand';
import { GameConfig } from './types';
import { defaultSymbolWeights, suggestWeightAdjustments } from '../utils';

interface ConfigActions {
  setGameConfig: (config: Partial<GameConfig>) => void;
  setPayoutMultiplier: (multiplier: number) => void;
  setSymbolWeights: (weights: Record<string, number>) => void;
  setFreeSpinConfig: (config: GameConfig['freeSpinConfig']) => void;
  setVolatility: (volatility: GameConfig['volatility']) => void;
}

const defaultConfig: GameConfig = {
  symbolWeights: suggestWeightAdjustments(defaultSymbolWeights),
  freeSpinConfig: {
    threeScatters: 3,
    fourScatters: 5,
    fiveScatters: 10
  },
  volatility: 'medium',
  payoutMultiplier: 1.0
};

export const useConfigState = create<GameConfig & ConfigActions>((set) => ({
  ...defaultConfig,
  setGameConfig: (config) => set((state) => ({ ...state, ...config })),
  setPayoutMultiplier: (multiplier) => set({ payoutMultiplier: multiplier }),
  setSymbolWeights: (weights) => set({ 
    symbolWeights: suggestWeightAdjustments(Object.values(weights)) 
  }),
  setFreeSpinConfig: (config) => set({ freeSpinConfig: config }),
  setVolatility: (volatility) => set({ volatility }),
}));
