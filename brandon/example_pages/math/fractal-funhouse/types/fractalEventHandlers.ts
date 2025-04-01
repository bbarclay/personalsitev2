export interface FractalEventHandlers {
  onZoom: (delta: number) => void;
  onPan: (x: number, y: number) => void;
  onReset: () => void;
}
