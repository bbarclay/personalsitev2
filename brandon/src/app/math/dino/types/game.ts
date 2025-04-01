import type { GameDifficulty } from './config';

export interface GameState {
  // Basic game state
  difficulty: GameDifficulty;
  points: number;
  isStarted: boolean;
  currentEra: number;
  character: string;

  // Collections
  erasDiscovered: number[];
  fossilsCollected: string[];
  achievementsUnlocked: string[];

  // Metadata
  lastPlayedAt?: number;
  version: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  requiredPoints?: number;
  requiredFossils?: number;
  requiredEras?: number;
}

export interface GameAction {
  type: 'START_GAME' 
      | 'UPDATE_POINTS' 
      | 'ADD_ERA' 
      | 'ADD_FOSSIL' 
      | 'UNLOCK_ACHIEVEMENT' 
      | 'SET_CHARACTER' 
      | 'SET_DIFFICULTY'
      | 'RESET_GAME';
  payload?: any;
}

// Game Events
export type GameEvent = {
  type: 'achievement' | 'points' | 'fossil' | 'era';
  message: string;
  points?: number;
};

// Memory Game Types
export type MemoryGamePhase = 'show' | 'input' | 'result' | 'idle';

export interface MemoryGameState {
  phase: MemoryGamePhase;
  dinoNames: string[];
  userInput: string;
  result: boolean | null;
  timeLeft: number;
}

// Sound Effects
export type SoundEffect = 
  | 'achievement'
  | 'collect'
  | 'correct'
  | 'incorrect'
  | 'start'
  | 'unlock';

// Animation Types
export type AnimationType = 
  | 'fadeIn'
  | 'fadeOut'
  | 'bounce'
  | 'shake'
  | 'spin'
  | 'float';

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay?: number;
}

// Utils
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
