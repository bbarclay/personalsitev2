export interface CoordinateTransform {
  worldToScreen: (x: number, y: number) => [number, number];
  screenToWorld: (x: number, y: number) => [number, number];
  scale: number;
}
