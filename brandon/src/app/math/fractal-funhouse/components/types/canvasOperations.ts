export interface CanvasOperations {
  clear: () => void;
  resize: (width: number, height: number) => void;
  draw: (data: ImageData) => void;
  getContext: () => CanvasRenderingContext2D | null;
}
