'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FractalType } from '../types/fractal';
import { FRACTAL_DEFAULTS } from '../constants';
import { useTheme } from 'next-themes';

interface FractalRendererProps {
  fractalType: FractalType;
  zoom: number;
  maxIterations: number;
  colors: string[];
  isProcessing?: boolean; // Make optional
  error: Error | null;
  onError: (error: Error) => void;
  width?: number; // Add optional width
  height?: number; // Add optional height
}

const FractalRenderer: React.FC<FractalRendererProps> = ({
  fractalType,
  zoom,
  maxIterations,
  colors,
  isProcessing,
  error,
  onError
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onError(new Error('Canvas context is not available.'));
      return;
    }

    const renderFractal = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;

        const defaults = FRACTAL_DEFAULTS[fractalType];
        if (!defaults) {
          throw new Error(`Invalid fractal type: ${fractalType}`);
        }

        const centerX = defaults.centerX;
        const centerY = defaults.centerY;
        const zoomScale = zoom / 200; // Normalize zoom

        for (let x = 0; x < canvas.width; x++) {
          for (let y = 0; y < canvas.height; y++) {
            let cX = (x - canvas.width / 2) / (zoomScale * canvas.width/4) + centerX;
            let cY = (y - canvas.height / 2) / (zoomScale * canvas.height/4) + centerY;

            let iter = 0;
            switch (fractalType) {
              case 'Mandelbrot':
                [iter] = calculateMandelbrot(cX, cY, maxIterations);
                break;
              case 'Julia':
                [iter] = calculateJulia(cX, cY, defaults.juliaReal!, defaults.juliaImag!, maxIterations);
                break;
              case 'BurningShip': // Changed from 'Burning Ship' to match FractalType
                [iter] = calculateBurningShip(cX, cY, maxIterations);
                break;
              case 'Tricorn':
                [iter] = calculateTricorn(cX, cY, maxIterations);
                break;
              case 'Multibrot':
                [iter] = calculateMultibrot(cX, cY, defaults.power || 3, maxIterations);
                break;
              case 'Feather':
                [iter] = calculateFeather(cX, cY, maxIterations);
                break;
              default:
                throw new Error(`Unsupported fractal type: ${fractalType}`);
            }

            const pixelIndex = (x + y * canvas.width) * 4;
            const [r, g, b] = getColor(iter, maxIterations, colors, theme === 'dark');
            data[pixelIndex] = r;
            data[pixelIndex + 1] = g;
            data[pixelIndex + 2] = b;
            data[pixelIndex + 3] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);
      } catch (e) {
        onError(e instanceof Error ? e : new Error('An error occurred while rendering the fractal.'));
      }
    };

    renderFractal();
  }, [fractalType, zoom, maxIterations, colors, theme, onError]);

  return (
    <motion.div
      className="relative w-full aspect-square"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full border border-border rounded-lg shadow-lg bg-background"
        tabIndex={0}
        aria-label="Fractal Canvas"
      />
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </motion.div>
  );
};

// Fractal calculation functions
const calculateMandelbrot = (cX: number, cY: number, maxIter: number): [number] => {
  let zx = 0, zy = 0, iter = 0;
  while (zx * zx + zy * zy < 4 && iter < maxIter) {
    const tmp = zx * zx - zy * zy + cX;
    zy = 2 * zx * zy + cY;
    zx = tmp;
    iter++;
  }
  return [iter];
};

const calculateJulia = (zx: number, zy: number, cX: number, cY: number, maxIter: number): [number] => {
  let iter = 0;
  while (zx * zx + zy * zy < 4 && iter < maxIter) {
    const tmp = zx * zx - zy * zy + cX;
    zy = 2 * zx * zy + cY;
    zx = tmp;
    iter++;
  }
  return [iter];
};

const calculateBurningShip = (cX: number, cY: number, maxIter: number): [number] => {
  let zx = 0, zy = 0, iter = 0;
  while (zx * zx + zy * zy < 4 && iter < maxIter) {
    const tmp = zx * zx - zy * zy + cX;
    zy = Math.abs(2 * zx * zy) + cY;
    zx = tmp;
    iter++;
  }
  return [iter];
};

const calculateTricorn = (cX: number, cY: number, maxIter: number): [number] => {
  let zx = 0, zy = 0, iter = 0;
  while (zx * zx + zy * zy < 4 && iter < maxIter) {
    const tmp = zx * zx - zy * zy + cX;
    zy = -2 * zx * zy + cY;
    zx = tmp;
    iter++;
  }
  return [iter];
};

const calculateMultibrot = (cX: number, cY: number, power: number, maxIter: number): [number] => {
  let zx = 0, zy = 0, iter = 0;
  while (zx * zx + zy * zy < 4 && iter < maxIter) {
    const r = Math.sqrt(zx * zx + zy * zy);
    const theta = Math.atan2(zy, zx);
    const newR = Math.pow(r, power);
    const newTheta = theta * power;
    zx = newR * Math.cos(newTheta) + cX;
    zy = newR * Math.sin(newTheta) + cY;
    iter++;
  }
  return [iter];
};

const calculateFeather = (cX: number, cY: number, maxIter: number): [number] => {
  let zx = cX, zy = cY, iter = 0;
  while (zx * zx + zy * zy < 4 && iter < maxIter) {
    const tmp = zx * zx * zx - 3 * zx * zy * zy + cX;
    zy = 3 * zx * zx * zy - zy * zy * zy + cY;
    zx = tmp;
    iter++;
  }
  return [iter];
};

const getColor = (iter: number, maxIter: number, colors: string[], isDarkMode: boolean): [number, number, number] => {
  if (iter === maxIter) {
    return isDarkMode ? [0, 0, 0] : [255, 255, 255];
  }

  const ratio = iter / maxIter;
  const colorIndex = Math.floor(ratio * (colors.length - 1));
  const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
  const colorRatio = (ratio * (colors.length - 1)) % 1;

  const color1 = hexToRgb(colors[colorIndex]);
  const color2 = hexToRgb(colors[nextColorIndex]);

  if (!color1 || !color2) return isDarkMode ? [0, 0, 0] : [255, 255, 255];

  return [
    Math.round(color1[0] * (1 - colorRatio) + color2[0] * colorRatio),
    Math.round(color1[1] * (1 - colorRatio) + color2[1] * colorRatio),
    Math.round(color1[2] * (1 - colorRatio) + color2[2] * colorRatio)
  ];
};

const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};

export default FractalRenderer;
