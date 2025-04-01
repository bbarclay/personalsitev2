'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BackgroundRenderer } from '../utils/background-renderer';
import { DinoAnimator } from '../utils/dino-animator';
import { MathChallengeGenerator, MathChallenge } from '../utils/math-challenge-generator';
import { EraId } from '../utils/era-utils';
import { useCanvas, getCanvasContext, initializeCanvas } from '../hooks/useCanvas';
import '../styles/math-animations.css';

interface DinoWorldProps {
  darkMode: boolean;
  currentEra: EraId;
  onCollectCrystal: (value: number) => void;
  onSolveChallenge: (success: boolean) => void;
}

interface GameState {
  dinoPosition: { x: number; y: number };
  velocity: { x: number; y: number };
  isJumping: boolean;
  score: number;
  challengeActive: MathChallenge | null;
}

interface Platform {
  x: number;
  y: number;
  width: number;
}

const CANVAS_SIZE = {
  width: 800,
  height: 600
} as const;

const PHYSICS = {
  gravity: 0.5,
  jumpForce: -12,
  moveSpeed: 5,
  groundLevel: 500
} as const;

export const DinoWorld: React.FC<DinoWorldProps> = ({
  darkMode,
  currentEra,
  onCollectCrystal,
  onSolveChallenge
}) => {
  const { canvasRef, getContext, width, height } = useCanvas(CANVAS_SIZE);
  const [gameState, setGameState] = useState<GameState>({
    dinoPosition: { x: 100, y: 300 },
    velocity: { x: 0, y: 0 },
    isJumping: false,
    score: 0,
    challengeActive: null
  });

  // Game entities
  const [challenges, setChallenges] = useState<MathChallenge[]>([]);
  const [platformPositions, setPlatformPositions] = useState<Platform[]>([]);
  
  // Refs for animation
  const backgroundRef = useRef<BackgroundRenderer | null>(null);
  const dinoAnimatorRef = useRef<DinoAnimator | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const animationFrameRef = useRef<number>();

  // Helper functions
  const generatePlatforms = (width: number, height: number): Platform[] => {
    const platforms: Platform[] = [];
    const numPlatforms = 8;

    for (let i = 0; i < numPlatforms; i++) {
      platforms.push({
        x: (width / numPlatforms) * i,
        y: height - 100 - Math.random() * 200,
        width: 100 + Math.random() * 100
      });
    }

    return platforms;
  };

  // Initialize game world
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize canvas with proper scaling
    initializeCanvas(canvas, width, height);

    const ctx = getCanvasContext(canvas);
    
    backgroundRef.current = new BackgroundRenderer(canvas, currentEra);
    dinoAnimatorRef.current = new DinoAnimator(ctx);

    // Generate initial challenges
    const generator = new MathChallengeGenerator(currentEra);
    const newChallenges = generator.generateChallenges(5).map(challenge => 
      generator.placeInWorld(
        challenge,
        width,
        height,
        challenges.map(c => c.position)
      )
    );
    setChallenges(newChallenges);

    // Generate platforms
    const platforms = generatePlatforms(width, height);
    setPlatformPositions(platforms);

    lastTimeRef.current = performance.now();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentEra, width, height]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = getCanvasContext(canvas);

    const gameLoop = (timestamp: number) => {
      if (!backgroundRef.current || !dinoAnimatorRef.current) return;

      // Clear and draw
      ctx.clearRect(0, 0, width, height);

      // Draw scene with timestamp
      backgroundRef.current.draw(timestamp);

      // Update physics
      setGameState(prev => {
        const newState = { ...prev };
        
        // Apply gravity if jumping
        if (prev.isJumping) {
          newState.velocity.y += PHYSICS.gravity;
        }

        // Update position
        newState.dinoPosition.x += prev.velocity.x;
        newState.dinoPosition.y += prev.velocity.y;

        // Check platform collisions
        const onPlatform = checkPlatformCollision(
          newState.dinoPosition,
          platformPositions
        );

        if (onPlatform && newState.velocity.y > 0) {
          newState.isJumping = false;
          newState.velocity.y = 0;
          newState.dinoPosition.y = onPlatform.y - 10;
        }

        // Check world boundaries
        if (newState.dinoPosition.x < 0) newState.dinoPosition.x = 0;
        if (newState.dinoPosition.x > width) {
          newState.dinoPosition.x = width;
        }

        return newState;
      });

      // Draw game elements
      drawGameElements(ctx, darkMode);

      // Draw dino
      dinoAnimatorRef.current.draw(
        gameState.dinoPosition.x,
        gameState.dinoPosition.y,
        gameState.velocity
      );

      // Check challenge collisions
      checkChallengeCollisions(gameState.dinoPosition);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [darkMode, gameState.dinoPosition, gameState.velocity, challenges, platformPositions, width, height]);

  const drawGameElements = (ctx: CanvasRenderingContext2D, isDark: boolean) => {
    // Draw platforms
    ctx.fillStyle = isDark ? '#4a5568' : '#a0aec0';
    platformPositions.forEach(platform => {
      ctx.fillRect(platform.x, platform.y, platform.width, 20);
    });

    // Draw challenges
    challenges.forEach(challenge => {
      if (challenge.collected) return;

      // Draw crystal
      ctx.fillStyle = getChallengeColor(challenge.difficulty);
      ctx.beginPath();
      ctx.moveTo(challenge.position.x, challenge.position.y - 15);
      ctx.lineTo(challenge.position.x + 10, challenge.position.y);
      ctx.lineTo(challenge.position.x, challenge.position.y + 15);
      ctx.lineTo(challenge.position.x - 10, challenge.position.y);
      ctx.closePath();
      ctx.fill();

      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = getChallengeColor(challenge.difficulty);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const checkPlatformCollision = (
    position: { x: number; y: number },
    platforms: Platform[]
  ): Platform | undefined => {
    return platforms.find(platform => 
      position.x >= platform.x &&
      position.x <= platform.x + platform.width &&
      position.y >= platform.y - 20 &&
      position.y <= platform.y
    );
  };

  const checkChallengeCollisions = (position: { x: number; y: number }) => {
    const collisionDistance = 50;
    challenges.forEach(challenge => {
      if (challenge.collected) return;

      const dx = position.x - challenge.position.x;
      const dy = position.y - challenge.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < collisionDistance) {
        setGameState(prev => ({ ...prev, challengeActive: challenge }));
        setChallenges(prev => 
          prev.map(c => 
            c.id === challenge.id ? { ...c, collected: true } : c
          )
        );
      }
    });
  };

  const getChallengeColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FFC107';
      case 'hard': return '#F44336';
      default: return '#2196F3';
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.challengeActive) return;

      setGameState(prev => {
        const newState = { ...prev };

        switch (e.key) {
          case 'ArrowLeft':
            newState.velocity.x = -PHYSICS.moveSpeed;
            break;
          case 'ArrowRight':
            newState.velocity.x = PHYSICS.moveSpeed;
            break;
          case ' ':
            if (!prev.isJumping) {
              newState.isJumping = true;
              newState.velocity.y = PHYSICS.jumpForce;
            }
            break;
        }

        return newState;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          setGameState(prev => ({
            ...prev,
            velocity: { ...prev.velocity, x: 0 }
          }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.challengeActive]);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {gameState.challengeActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className={`
            p-6 rounded-xl
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            max-w-md w-full mx-4
          `}>
            <h3 className="text-xl font-bold mb-4">Math Challenge!</h3>
            <p className="mb-4">{gameState.challengeActive.question}</p>
            <div className="grid grid-cols-2 gap-4">
              {gameState.challengeActive.options.map((option: number, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    const correct = option === gameState.challengeActive!.answer;
                    onSolveChallenge(correct);
                    if (correct) {
                      onCollectCrystal(10);
                      if (dinoAnimatorRef.current) {
                        dinoAnimatorRef.current.startCelebrating();
                      }
                    }
                    setGameState(prev => ({ ...prev, challengeActive: null }));
                  }}
                  className={`
                    p-4 rounded-lg text-center font-bold
                    ${darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }
                    transition-colors
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
