import { EraId } from './era-utils';

export interface MathChallenge {
  id: string;
  question: string;
  options: number[];
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  concept: string;
  position: { x: number; y: number };
  collected: boolean;
}

interface MathOperation {
  operator: string;
  generate: (min: number, max: number) => {
    num1: number;
    num2: number;
    answer: number;
  };
}

export class MathChallengeGenerator {
  private era: EraId;
  private difficulty: 'easy' | 'medium' | 'hard';
  
  private readonly OPERATIONS: Record<string, MathOperation> = {
    addition: {
      operator: '+',
      generate: (min, max) => {
        const num1 = Math.floor(Math.random() * (max - min)) + min;
        const num2 = Math.floor(Math.random() * (max - min)) + min;
        return { num1, num2, answer: num1 + num2 };
      }
    },
    subtraction: {
      operator: '-',
      generate: (min, max) => {
        const answer = Math.floor(Math.random() * (max - min)) + min;
        const num2 = Math.floor(Math.random() * answer);
        const num1 = answer + num2;
        return { num1, num2, answer };
      }
    },
    multiplication: {
      operator: '×',
      generate: (min, max) => {
        const num1 = Math.floor(Math.random() * (max - min)) + min;
        const num2 = Math.floor(Math.random() * (max - min)) + min;
        return { num1, num2, answer: num1 * num2 };
      }
    },
    division: {
      operator: '÷',
      generate: (min, max) => {
        const num2 = Math.floor(Math.random() * (max - min)) + min;
        const answer = Math.floor(Math.random() * (max - min)) + min;
        const num1 = num2 * answer;
        return { num1, num2, answer };
      }
    }
  };

  private readonly ERA_CONFIG = {
    triassic: {
      concepts: ['addition', 'subtraction'],
      ranges: {
        easy: { min: 1, max: 10 },
        medium: { min: 10, max: 20 },
        hard: { min: 20, max: 50 }
      }
    },
    jurassic: {
      concepts: ['multiplication', 'division'],
      ranges: {
        easy: { min: 1, max: 5 },
        medium: { min: 5, max: 10 },
        hard: { min: 10, max: 12 }
      }
    },
    cretaceous: {
      concepts: ['addition', 'subtraction', 'multiplication', 'division'],
      ranges: {
        easy: { min: 1, max: 20 },
        medium: { min: 20, max: 50 },
        hard: { min: 50, max: 100 }
      }
    }
  };

  constructor(era: EraId, difficulty: 'easy' | 'medium' | 'hard' = 'easy') {
    this.era = era;
    this.difficulty = difficulty;
  }

  public generateChallenges(count: number): MathChallenge[] {
    const challenges: MathChallenge[] = [];
    const config = this.ERA_CONFIG[this.era];
    const range = config.ranges[this.difficulty];

    for (let i = 0; i < count; i++) {
      const concept = config.concepts[Math.floor(Math.random() * config.concepts.length)];
      const operation = this.OPERATIONS[concept];
      const { num1, num2, answer } = operation.generate(range.min, range.max);

      challenges.push({
        id: `challenge-${Date.now()}-${i}`,
        question: `What is ${num1} ${operation.operator} ${num2}?`,
        options: this.generateOptions(answer, range.min, range.max),
        answer,
        difficulty: this.difficulty,
        concept,
        position: { x: 0, y: 0 }, // Will be set by placeInWorld
        collected: false
      });
    }

    return challenges;
  }

  private generateOptions(answer: number, min: number, max: number): number[] {
    const options = new Set<number>([answer]);
    
    while (options.size < 4) {
      let option: number;
      const rand = Math.random();
      
      if (rand < 0.3) {
        // Close to answer (+/- 1 or 2)
        option = answer + (Math.random() < 0.5 ? 1 : 2) * (Math.random() < 0.5 ? 1 : -1);
      } else if (rand < 0.6) {
        // Common mistakes (e.g., wrong operation)
        option = this.generateCommonMistake(answer);
      } else {
        // Random number in range
        option = Math.floor(Math.random() * (max - min)) + min;
      }

      if (option >= min && option <= max) {
        options.add(option);
      }
    }

    return this.shuffleArray(Array.from(options));
  }

  private generateCommonMistake(answer: number): number {
    const mistakes = [
      answer * 2,  // Double
      Math.floor(answer / 2),  // Half
      answer + 10, // Off by 10
      answer - 10,
      answer * 10, // Place value error
      Math.floor(answer / 10)
    ];

    return mistakes[Math.floor(Math.random() * mistakes.length)];
  }

  public placeInWorld(
    challenge: MathChallenge,
    worldWidth: number,
    worldHeight: number,
    existingPositions: { x: number; y: number }[]
  ): MathChallenge {
    const margin = 50;
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const x = margin + Math.random() * (worldWidth - 2 * margin);
      const y = margin + Math.random() * (worldHeight - 2 * margin);

      // Check minimum distance from other challenges
      const tooClose = existingPositions.some(pos => {
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 100;
      });

      if (!tooClose) {
        return {
          ...challenge,
          position: { x, y }
        };
      }

      attempts++;
    }

    // If we couldn't find a good spot, place it randomly
    return {
      ...challenge,
      position: {
        x: margin + Math.random() * (worldWidth - 2 * margin),
        y: margin + Math.random() * (worldHeight - 2 * margin)
      }
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public setDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.difficulty = difficulty;
  }
}
