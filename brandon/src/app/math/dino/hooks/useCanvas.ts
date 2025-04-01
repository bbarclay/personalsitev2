
'use client';

import { useEffect, useRef, MutableRefObject } from 'react';

interface CanvasSize {
  width: number;
  height: number;
}

interface UseCanvasResult {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  getContext: () => CanvasRenderingContext2D | null;
  width: number;
  height: number;
  devicePixelRatio: number;
  resizeCanvas: (newSize: CanvasSize) => void;
}

/**
 * Custom hook for canvas management with DPI/scaling support
 */
export function useCanvas(initialSize: CanvasSize): UseCanvasResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef<CanvasSize>(initialSize);
  const dprRef = useRef<number>(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });

    if (!contextRef.current) {
      console.error('Could not get 2D context from canvas element');
      return;
    }

    // Set initial size with DPI scaling
    updateCanvasSize(canvas, sizeRef.current, dprRef.current);
  }, []);

  // Handle window resize and DPI changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const newDpr = window.devicePixelRatio || 1;
      if (newDpr !== dprRef.current) {
        dprRef.current = newDpr;
        updateCanvasSize(canvas, sizeRef.current, newDpr);
      }
    };

    const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    mediaQuery.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update canvas size with proper DPI scaling
  const updateCanvasSize = (
    canvas: HTMLCanvasElement,
    size: CanvasSize,
    dpr: number
  ): void => {
    const { width, height } = size;
    
    // Set canvas dimensions with DPI scaling
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Set display size
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Scale context to match DPI
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      contextRef.current = ctx;
    }
  };

  // Resize handler for external size changes
  const resizeCanvas = (newSize: CanvasSize): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    sizeRef.current = newSize;
    updateCanvasSize(canvas, newSize, dprRef.current);
  };

  return {
    canvasRef,
    getContext: () => contextRef.current,
    width: sizeRef.current.width,
    height: sizeRef.current.height,
    devicePixelRatio: dprRef.current,
    resizeCanvas
  };
}

/**
 * Type guard to ensure canvas context exists
 */
export function assertContext(
  context: CanvasRenderingContext2D | null,
  message = 'Canvas context is null'
): asserts context is CanvasRenderingContext2D {
  if (!context) {
    throw new Error(message);
  }
}

/**
 * Helper function to get a canvas context with error handling
 */
export function getCanvasContext(
  canvas: HTMLCanvasElement | null,
  contextId: '2d' = '2d',
  contextAttributes?: CanvasRenderingContext2DSettings
): CanvasRenderingContext2D {
  if (!canvas) {
    throw new Error('Canvas element is null');
  }

  const context = canvas.getContext(contextId, contextAttributes);
  if (!context || !(context instanceof CanvasRenderingContext2D)) {
    throw new Error(`Failed to get ${contextId} context`);
  }

  return context;
}

/**
 * Helper to initialize canvas with proper DPR scaling
 */
export function initializeCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  options: {
    alpha?: boolean;
    desynchronized?: boolean;
    willReadFrequently?: boolean;
  } = {}
): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  
  // Set canvas dimensions with DPI scaling
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  
  // Set display size
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  // Get and configure context
  const ctx = getCanvasContext(canvas, '2d', options);
  ctx.scale(dpr, dpr);
  
  return ctx;
}

/**
 * Helper to create an offscreen canvas with proper DPR scaling
 * Note: Only use if OffscreenCanvas is supported in the target environment
 */
export function createOffscreenCanvas(width: number, height: number): {
  canvas: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;
} {
  if (typeof window === 'undefined' || !('OffscreenCanvas' in window)) {
    throw new Error('OffscreenCanvas is not supported in this environment');
  }

  const dpr = window.devicePixelRatio || 1;
  const canvas = new OffscreenCanvas(
    Math.round(width * dpr),
    Math.round(height * dpr)
  );
  
  const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
  if (!ctx) {
    throw new Error('Failed to get offscreen canvas context');
  }
  
  ctx.scale(dpr, dpr);
  return { canvas, ctx };
}
