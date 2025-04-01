'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EraId, ERAS } from '../utils/era-utils';
import { DinoWorld } from './DinoWorld';
import { DinoQuiz } from './DinoQuiz';
import { DinoFossils } from './DinoFossils';
import { MathProblemPanel } from './MathProblemPanel';
import { MemoryGame } from './MemoryGame';
import { ShowCelebration } from '../types';
import { getProgress, saveProgress, updateAchievement } from '../utils/storage';
import { getRandomDinosaur } from '../utils/era-utils';

interface DinoGameProps {
  currentEra: EraId;
  darkMode: boolean;
  onScoreUpdate: (newScore: number) => void;
}

export function DinoGame({ 
  currentEra, 
  darkMode,
  onScoreUpdate 
}: DinoGameProps) {
  const [activeTab, setActiveTab] = useState<string>('world');
  const [score, setScore] = useState<number>(() => getProgress().score);
  const [showMemoryGame, setShowMemoryGame] = useState<boolean | 'show' | 'input'>(false);
  const [memoryGameDinos, setMemoryGameDinos] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [memoryResult, setMemoryResult] = useState<boolean | null>(null);
  const [celebration, setCelebration] = useState<ShowCelebration>({
    active: false,
    message: ''
  });

  // Reset the memory game when the era changes
  useEffect(() => {
    setShowMemoryGame(false);
    setMemoryResult(null);
  }, [currentEra]);

  // Update global score when local score changes
  useEffect(() => {
    onScoreUpdate(score);
    
    // Check for achievements
    if (score >= 100 && !getProgress().achievements['score_100']?.earned) {
      updateAchievement('score_100');
      showCelebration('Achievement Unlocked: Score 100!');
    }
    if (score >= 500 && !getProgress().achievements['score_500']?.earned) {
      updateAchievement('score_500');
      showCelebration('Achievement Unlocked: Score Master!');
    }
    
    // Save progress
    saveProgress({ score });
  }, [score, onScoreUpdate]);

  // Show a celebration with animation
  const showCelebration = (message: string) => {
    setCelebration({ active: true, message });
    
    // Hide after a delay
    setTimeout(() => {
      setCelebration({ active: false, message: '' });
    }, 5000);
  };

  // Handle crystal collection from DinoWorld
  const handleCollectCrystal = (value: number) => {
    setScore(prev => prev + value);
    
    // Randomly trigger memory game (10% chance when collecting crystals)
    if (Math.random() < 0.1 && !showMemoryGame) {
      startMemoryGame();
    }
  };

  // Start the memory game with random dinosaurs
  const startMemoryGame = () => {
    // Generate 3-5 random dinosaur names based on era difficulty
    const count = 3 + Math.min(2, ERAS[currentEra].difficulty - 1);
    const dinos: string[] = [];
    
    for (let i = 0; i < count; i++) {
      dinos.push(getRandomDinosaur(currentEra));
    }
    
    setMemoryGameDinos(dinos);
    setUserAnswer('');
    setMemoryResult(null);
    setShowMemoryGame('show');
    
    // Auto-transition to input after showing the names
    setTimeout(() => {
      if (showMemoryGame === 'show') {
        setShowMemoryGame('input');
      }
    }, 4000);
  };

  // Check the memory game answer
  const checkMemoryAnswer = () => {
    const correctAnswer = memoryGameDinos.join(' ').toLowerCase();
    const isCorrect = userAnswer.toLowerCase() === correctAnswer;
    
    setMemoryResult(isCorrect);
    
    // Award points if correct
    if (isCorrect) {
      const bonusPoints = 20 * memoryGameDinos.length;
      setScore(prev => prev + bonusPoints);
      showCelebration(`Memory Master! +${bonusPoints} points`);
    }
    
    // Hide after a delay
    setTimeout(() => {
      setShowMemoryGame(false);
      setMemoryResult(null);
    }, 3000);
  };

  // Handle math challenge completion
  const handleSolveChallenge = (success: boolean) => {
    // Award points for correct answers
    if (success) {
      const points = 15 * ERAS[currentEra].difficulty;
      setScore(prev => prev + points);
      
      // Check for consecutive success achievements
      const progress = getProgress();
      const conceptProgress = progress.mathProgress[currentEra];
      
      if (conceptProgress && conceptProgress.correct >= 5) {
        updateAchievement(`mastery_${currentEra}`);
        showCelebration(`Achievement Unlocked: ${ERAS[currentEra].name} Master!`);
      }
    }
  };

  // Handle fossil discovery
  const handleFossilFound = (value: number) => {
    setScore(prev => prev + value);
    
    // Check for fossil collection achievements
    const progress = getProgress();
    const fossilsFound = (progress.mathProgress.fossils?.correct || 0) + 1;
    
    // Save fossil progress
    updateAchievement('fossil_hunter', fossilsFound >= 10);
    
    if (fossilsFound === 10) {
      showCelebration('Achievement Unlocked: Fossil Hunter!');
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (quizScore: number) => {
    const points = quizScore * 10 * ERAS[currentEra].difficulty;
    setScore(prev => prev + points);
    
    if (quizScore === 5) {
      updateAchievement(`quiz_master_${currentEra}`);
      showCelebration(`Achievement Unlocked: ${ERAS[currentEra].name} Quiz Master!`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Celebration overlay */}
      {celebration.active && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-lg shadow-lg animate-bounce text-2xl font-bold">
            {celebration.message}
          </div>
        </div>
      )}
      
      {/* Memory game overlay */}
      <MemoryGame
        isActive={showMemoryGame}
        darkMode={darkMode}
        dinoNames={memoryGameDinos}
        userAnswer={userAnswer}
        memoryResult={memoryResult}
        onAnswerChange={setUserAnswer}
        onSubmit={checkMemoryAnswer}
      />
      
      {/* Game navigation */}
      <Tabs 
        defaultValue="world" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="world">
              <span className="flex items-center">
                <span className="text-xl mr-2">🦕</span> Dino World
              </span>
            </TabsTrigger>
            <TabsTrigger value="quiz">
              <span className="flex items-center">
                <span className="text-xl mr-2">📚</span> Dino Quiz
              </span>
            </TabsTrigger>
            <TabsTrigger value="fossils">
              <span className="flex items-center">
                <span className="text-xl mr-2">🦴</span> Fossil Dig
              </span>
            </TabsTrigger>
            <TabsTrigger value="math">
              <span className="flex items-center">
                <span className="text-xl mr-2">🧮</span> Math Problems
              </span>
            </TabsTrigger>
          </TabsList>
          
          <div className="text-xl font-bold">
            Score: {score}
          </div>
        </div>
        
        <TabsContent value="world" className="mt-0">
          <Card className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <DinoWorld
              darkMode={darkMode}
              currentEra={currentEra}
              onCollectCrystal={handleCollectCrystal}
              onSolveChallenge={handleSolveChallenge}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0">
          <DinoQuiz
            currentEra={currentEra}
            darkMode={darkMode}
            onComplete={handleQuizComplete}
          />
        </TabsContent>
        
        <TabsContent value="fossils" className="mt-0">
          <DinoFossils
            currentEra={currentEra}
            darkMode={darkMode}
            onFossilFound={handleFossilFound}
          />
        </TabsContent>
        
        <TabsContent value="math" className="mt-0">
          <Card className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <MathProblemPanel
              darkMode={darkMode}
              currentEra={currentEra}
              onAnswerSubmit={handleSolveChallenge}
            />
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Era info */}
      <Card className={`mt-6 p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{ERAS[currentEra].name} Period</h3>
            <p className="text-sm opacity-80">{ERAS[currentEra].period}</p>
            <p className="mt-2">{ERAS[currentEra].description}</p>
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold mb-2">Dinosaurs from this era:</h4>
            <ul className="list-disc list-inside">
              {ERAS[currentEra].dinosaurs.map(dino => (
                <li key={dino}>{dino}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold mb-2">Era Information:</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Climate:</span> {ERAS[currentEra].climate}</p>
              <p><span className="font-medium">Vegetation:</span> {ERAS[currentEra].vegetation}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
