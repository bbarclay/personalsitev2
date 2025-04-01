export interface TriangleChallenge {
  id: number;
  level: number;
  description: string;
  givenAngles: (number | null)[];
  givenSides?: (number | null)[];
  correctType: TriangleType;
  missingAngle: number;
  reward: number;
  visual?: string;
}

export type TriangleType = 'Equilateral' | 'Isosceles' | 'Scalene' | 'Right';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  condition: (gameState: GameState) => boolean;
}

export interface TriangleTypeInfo {
  name: TriangleType;
  description: string;
  icon: string;
  properties: string[];
}

export interface GameState {
  gameStarted: boolean;
  pharaohName: string;
  pyramidProgress: number;
  knowledgePoints: number;
  currentLevel: number;
  currentChallenge: TriangleChallenge | null;
  feedbackMessage: string;
  feedbackType: 'success' | 'error' | 'info';
  selectedType: TriangleType | null;
  inputAngle: string;
}

export type Theme = 'day' | 'night'; 