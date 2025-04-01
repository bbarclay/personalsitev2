import { QualityPreset } from '../types/qualityPreset';

export const RENDER_QUALITY_PRESETS: readonly QualityPreset[] = [
  {
    name: 'Low',
    maxIterations: 50,
    antialiasing: false,
    resolution: { width: 800, height: 600 },
  },
  {
    name: 'Medium',
    maxIterations: 200,
    antialiasing: true,
    resolution: { width: 1200, height: 900 },
  },
  {
    name: 'High',
    maxIterations: 500,
    antialiasing: true,
    resolution: { width: 1920, height: 1080 },
  },
];
