'use client';

import React from 'react';
import { FractalType } from '../types/fractal';
import { UI_CONFIG, FRACTAL_TYPES, COLOR_SCHEMES, FRACTAL_DISPLAY_NAMES } from '../constants';
import { RefreshCw, Sliders } from 'lucide-react';
import { useTheme } from 'next-themes';

interface FractalControlsProps {
  fractalType: FractalType;
  zoom: number;
  maxIterations: number;
  colors: string[];
  onFractalTypeChange: (type: FractalType) => void;
  onZoomChange: (zoom: number) => void;
  onGenerate: () => void;
  onReset: () => void;
  onColorChange: (colors: string[]) => void;
  onMaxIterationsChange: (iterations: number) => void;
}

const FractalControls: React.FC<FractalControlsProps> = ({
  fractalType,
  zoom,
  maxIterations,
  colors,
  onFractalTypeChange,
  onZoomChange,
  onGenerate,
  onReset,
  onColorChange,
  onMaxIterationsChange,
}) => {
  const { theme } = useTheme();
  const currentColorSchemes = theme === 'dark' ? COLOR_SCHEMES.DARK : COLOR_SCHEMES.LIGHT;

  return (
    <div className="bg-card p-6 rounded-lg border border-border space-y-6">
      <div className="space-y-4">
        {/* Fractal Type Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Fractal Type
          </label>
          <select
            value={fractalType}
            onChange={(e) => onFractalTypeChange(e.target.value as FractalType)}
            className="w-full bg-background text-foreground border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.values(FRACTAL_TYPES).map((type) => (
              <option key={type} value={type}>
                {FRACTAL_DISPLAY_NAMES[type]}
              </option>
            ))}
          </select>
        </div>

        {/* Color Scheme Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Color Scheme
          </label>
          <select
            value={colors.join(',')}
            onChange={(e) => onColorChange(e.target.value.split(','))}
            className="w-full bg-background text-foreground border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {(Object.entries(currentColorSchemes) as [string, readonly string[]][]).map(([name, scheme]) => (
              <option key={name} value={scheme.join(',')}>
                {name.toLowerCase()
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Max Iterations Control */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Max Iterations
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={UI_CONFIG.MIN_ITERATIONS}
              max={UI_CONFIG.MAX_ITERATIONS}
              value={maxIterations}
              onChange={(e) => onMaxIterationsChange(parseInt(e.target.value, 10))}
              className="flex-grow"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {maxIterations}
            </span>
          </div>
        </div>

        {/* Zoom Control */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Zoom Level
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={UI_CONFIG.MIN_ZOOM}
              max={UI_CONFIG.MAX_ZOOM}
              value={zoom}
              onChange={(e) => onZoomChange(parseInt(e.target.value, 10))}
              className="flex-grow"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {zoom}x
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={onReset}
          className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </button>
        <button
          onClick={onGenerate}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Sliders className="w-4 h-4 mr-2" />
          Generate
        </button>
      </div>
    </div>
  );
};

export default FractalControls;
