import type { GameConfig, GameDifficultySettings } from '../types/config';

export const DIFFICULTY_SETTINGS: Record<string, GameDifficultySettings> = {
  easy: {
    memoryGameShowDuration: 5000,
    minNames: 2,
    maxNames: 4,
    factRotationInterval: 10000
  },
  medium: {
    memoryGameShowDuration: 4000,
    minNames: 3,
    maxNames: 5,
    factRotationInterval: 8000
  },
  hard: {
    memoryGameShowDuration: 3000,
    minNames: 4,
    maxNames: 6,
    factRotationInterval: 6000
  }
};

export const DEFAULT_GAME_CONFIG: GameConfig = {
  timings: {
    memoryGameShowDuration: DIFFICULTY_SETTINGS.medium.memoryGameShowDuration,
    celebrationDuration: 3000,
    factRotationInterval: DIFFICULTY_SETTINGS.medium.factRotationInterval
  },
  scoring: {
    initialPoints: 10,
    fossilPoints: 10,
    eraDiscoveryPoints: 20,
    memoryGamePointsPerName: 10
  },
  memoryGame: {
    minNames: DIFFICULTY_SETTINGS.medium.minNames,
    maxNames: DIFFICULTY_SETTINGS.medium.maxNames
  },
  achievements: {
    fossilsNeededForAchievement: 10
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  GAME_STATE: 'dino-game-state',
  PREFERENCES: 'dino-game-preferences'
} as const;

// Game Version for save compatibility
export const GAME_VERSION = '1.0.0';

// Maximum save file age (7 days)
export const MAX_SAVE_AGE = 7 * 24 * 60 * 60 * 1000;
