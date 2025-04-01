export interface Character {
  name: string;
  color: string;
  emoji: string;
}

export interface Era {
  name: string;
  color: string;
  description: string;
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}

export interface IntroStep {
  text: string;
  character: string;
}

export type MemoryGameState = false | 'show' | 'input';

export interface CharacterMap {
  [key: string]: Character;
}

export interface ShowCelebration {
  active: boolean;
  message: string;
}
