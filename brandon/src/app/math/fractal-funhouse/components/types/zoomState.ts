export interface ZoomState {
  scale: number;
  center: { x: number; y: number };
  previousScale: number;
  minScale: number;
  maxScale: number;
}
