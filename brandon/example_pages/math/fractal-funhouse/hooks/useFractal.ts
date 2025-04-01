import { useState, useCallback } from 'react';
import { FractalType, FractalState } from '../types/fractal';
import { FRACTAL_TYPES, COLOR_SCHEMES } from '../constants';

const initialState: FractalState = {
  fractalType: 'Mandelbrot',
  zoom: 200,
  maxIterations: 100,
  colors: [...COLOR_SCHEMES.LIGHT.DEFAULT] as string[], // Convert readonly to mutable
  isProcessing: false,
  error: null
};

export const useFractal = () => {
  const [state, setState] = useState<FractalState>(initialState);

  const handleFractalTypeChange = useCallback((type: FractalType) => {
    setState(prev => ({
      ...prev,
      fractalType: type,
      error: null
    }));
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setState(prev => ({
      ...prev,
      zoom,
      error: null
    }));
  }, []);

  const handleMaxIterationsChange = useCallback((maxIterations: number) => {
    setState(prev => ({
      ...prev,
      maxIterations,
      error: null
    }));
  }, []);

  const handleChangeColors = useCallback((colors: string[]) => {
    setState(prev => ({
      ...prev,
      colors,
      error: null
    }));
  }, []);

  const handleGenerateFractal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      error: null
    }));
    // Actual fractal generation is handled in the FractalRenderer component
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isProcessing: false
      }));
    }, 100);
  }, []);

  const handleReset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    handleFractalTypeChange,
    handleZoomChange,
    handleMaxIterationsChange,
    handleChangeColors,
    handleGenerateFractal,
    handleReset
  };
};
