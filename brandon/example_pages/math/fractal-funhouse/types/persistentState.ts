import { FractalState } from './fractal';

export interface PersistentState {
  version: number;
  timestamp: number;
  data: Partial<FractalState>;
}
