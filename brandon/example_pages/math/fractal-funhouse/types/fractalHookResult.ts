import { FractalState } from './fractal';

export interface FractalHookResult {
  state: FractalState;
  actions: {
    generate: () => Promise<void>;
    reset: () => void;
    updateColors: (colors: string[]) => void;
    updateZoom: (zoom: number) => void;
  };
  refs: {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    containerRef: React.RefObject<HTMLDivElement>;
  };
}
