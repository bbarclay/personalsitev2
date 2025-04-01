'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  GameState, 
  GameAction, 
  GameEvent, 
  SoundEffect,
  Optional 
} from '../types/game';
import { GamePreferences, ThemeMode, GameDifficulty } from '../types/config';
import { gameReducer, initialGameState } from '../reducers/gameReducer';
import { DEFAULT_GAME_CONFIG } from '../config/game-config';
import { 
  saveGameState, 
  savePreferences, 
  getInitialPreferences 
} from '../utils/storage';

interface GameContextValue {
  // State
  state: GameState;
  preferences: GamePreferences;
  config: typeof DEFAULT_GAME_CONFIG;
  
  // Game Actions
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  updatePoints: (points: number) => void;
  discoverEra: (eraIndex: number) => void;
  collectFossil: (fossilName: string) => void;
  unlockAchievement: (achievementId: string) => void;
  setCharacter: (characterId: string) => void;
  resetGame: () => void;
  
  // Preferences
  setDifficulty: (difficulty: GameDifficulty) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleSound: () => void;
  
  // Utils
  playSound: (effect: SoundEffect) => void;
  showEvent: (event: GameEvent) => void;
}

const GameContext = createContext<Optional<GameContextValue>>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [preferences, setPreferences] = React.useState<GamePreferences>(getInitialPreferences);

  // Persist state changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  // Game Actions
  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const updatePoints = useCallback((points: number) => {
    dispatch({ type: 'UPDATE_POINTS', payload: points });
  }, []);

  const discoverEra = useCallback((eraIndex: number) => {
    dispatch({ type: 'ADD_ERA', payload: eraIndex });
  }, []);

  const collectFossil = useCallback((fossilName: string) => {
    dispatch({ type: 'ADD_FOSSIL', payload: fossilName });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievementId });
  }, []);

  const setCharacter = useCallback((characterId: string) => {
    dispatch({ type: 'SET_CHARACTER', payload: characterId });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Preferences
  const setDifficulty = useCallback((difficulty: GameDifficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    setPreferences(prev => ({ ...prev, difficulty }));
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    setPreferences(prev => ({ ...prev, theme }));
  }, []);

  const toggleSound = useCallback(() => {
    setPreferences(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  // Utils
  const playSound = useCallback((effect: SoundEffect) => {
    if (!preferences.soundEnabled) return;
    // TODO: Implement sound effects system
    console.log('Playing sound:', effect);
  }, [preferences.soundEnabled]);

  const showEvent = useCallback((event: GameEvent) => {
    // TODO: Implement event display system
    console.log('Game event:', event);
  }, []);

  const value: GameContextValue = {
    state,
    preferences,
    config: DEFAULT_GAME_CONFIG,
    dispatch,
    startGame,
    updatePoints,
    discoverEra,
    collectFossil,
    unlockAchievement,
    setCharacter,
    resetGame,
    setDifficulty,
    setTheme,
    toggleSound,
    playSound,
    showEvent
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

// Custom hooks for specific game features
export function useGameState() {
  const { state } = useGame();
  return state;
}

export function useGamePreferences() {
  const { preferences } = useGame();
  return preferences;
}

export function useGameActions() {
  const { 
    startGame, 
    updatePoints, 
    discoverEra, 
    collectFossil, 
    unlockAchievement,
    setCharacter,
    resetGame 
  } = useGame();
  
  return {
    startGame,
    updatePoints,
    discoverEra,
    collectFossil,
    unlockAchievement,
    setCharacter,
    resetGame
  };
}
