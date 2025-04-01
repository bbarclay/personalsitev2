export interface RenderContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dimensions: { width: number; height: number };
  pixelRatio: number;
}
