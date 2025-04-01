export interface TouchState {
  touches: Map<number, { x: number; y: number }>;
  scale: number;
  rotation: number;
}
