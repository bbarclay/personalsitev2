'use client';

import { useState, useEffect } from 'react';
import { PersistentState } from '../types/persistentState';
import { FractalState } from '../types/fractal';

const STORAGE_KEY = 'fractalFunhouseState';

export const usePersistentState = (
  initialState: FractalState
): [FractalState, React.Dispatch<React.SetStateAction<FractalState>>] => {
  const [state, setState] = useState<FractalState>(initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const parsed: PersistentState = JSON.parse(storedState);
        if (parsed.version === 1) { // Example versioning
          setState(parsed.data as FractalState);
        }
      }
    } catch (e) {
      console.warn('Could not load state from localStorage.', e);
    }
  }, []);

  useEffect(() => {
    const persistentState: PersistentState = {
      version: 1,
      timestamp: Date.now(),
      data: state,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
    } catch (e) {
      console.warn('Could not save state to localStorage.', e);
    }
  }, [state]);

  return [state, setState];
};
