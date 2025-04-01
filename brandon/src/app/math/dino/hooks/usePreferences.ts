import { useCallback } from 'react';
import type { GamePreferences, ThemeMode, GameDifficulty } from '../types/config';
import { useGame } from '../context/GameContext';

export function usePreferences() {
  const { preferences, setTheme: contextSetTheme, setDifficulty } = useGame();

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = preferences.theme === 'dark' ? 'light' : 'dark';
    contextSetTheme(newTheme);
  }, [preferences.theme, contextSetTheme]);

  const updateDifficulty = useCallback((difficulty: GameDifficulty) => {
    setDifficulty(difficulty);
  }, [setDifficulty]);

  const isDarkMode = preferences.theme === 'dark';

  return {
    preferences,
    isDarkMode,
    toggleTheme,
    updateDifficulty
  };
}
