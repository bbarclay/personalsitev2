export interface MouseState {
  isPressed: boolean;
  position: { x: number; y: number };
  movement: { dx: number; dy: number };
  buttons: Set<number>;
}
