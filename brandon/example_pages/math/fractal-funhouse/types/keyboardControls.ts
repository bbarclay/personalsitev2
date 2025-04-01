export interface KeyboardControls {
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  keyMap: Record<string, () => void>;
}
