export type QualityPreset = {
  readonly name: string;
  readonly maxIterations: number;
  readonly antialiasing: boolean;
  readonly resolution: { width: number; height: number };
};
