export interface GameConfig {
  timings: {
    memoryGameShowDuration: number;  // Time in ms to show dino names
    celebrationDuration: number;     // Time in ms to show celebration overlay
    factRotationInterval: number;    // Time in ms between fact changes
  };
  scoring: {
    initialPoints: number;
    fossilPoints: number;
    eraDiscoveryPoints: number;
    memoryGamePointsPerName: number;
  };
  memoryGame: {
    minNames: number;
    maxNames: number;
  };
  achievements: {
    fossilsNeededForAchievement: number;
  };
}

export interface GameDifficultySettings {
  memoryGameShowDuration: number;
  minNames: number;
  maxNames: number;
  factRotationInterval: number;
}

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  difficulty: GameDifficulty;
  points: number;
  erasDiscovered: number[];
  fossilsCollected: string[];
  achievementsUnlocked: string[];
  lastPlayedTimestamp?: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface GamePreferences {
  theme: ThemeMode;
  soundEnabled: boolean;
  difficulty: GameDifficulty;
}
