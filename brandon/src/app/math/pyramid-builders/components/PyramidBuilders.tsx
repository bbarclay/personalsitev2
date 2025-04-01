"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Theme, Achievement, TriangleChallenge, TriangleType } from '../types';
import { CHALLENGES, TRIANGLE_TYPES, ACHIEVEMENTS_LIST, TUTORIAL_STEPS } from '../utils/gameData';
import { soundManager } from '../utils/sounds';
import Header from './Header';
import ChallengeArea from './ChallengeArea';
import StartScreen from './StartScreen';
import GameInfo from './GameInfo';
import Tutorial from './Tutorial';
import Notification from './Notification';

const PyramidBuilders: React.FC = () => {
  // State
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    pharaohName: '',
    pyramidProgress: 0,
    knowledgePoints: 0,
    currentLevel: 0,
    currentChallenge: null,
    feedbackMessage: '',
    feedbackType: 'info',
    selectedType: null,
    inputAngle: '',
  });
  const [theme, setTheme] = useState<Theme>('day');
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_LIST);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [tempPharaohName, setTempPharaohName] = useState('');
  const [challengeStartTime, setChallengeStartTime] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  // New states for improved UX
  const [showHint, setShowHint] = useState(false);
  const [animatePyramid, setAnimatePyramid] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Effects
  // Load first challenge when game starts
  useEffect(() => {
    if (gameState.gameStarted && gameState.currentLevel === 0) {
      loadChallenge(0);
      setShowTutorial(true);
    }
  }, [gameState.gameStarted, gameState.currentLevel]);

  // Helper Functions
  const toggleTheme = () => {
    setTheme(theme === 'day' ? 'night' : 'day');
    soundManager.play('click', 0.3);
  };

  const toggleSound = () => {
    const isEnabled = soundManager.toggle();
    setSoundEnabled(isEnabled);
    if (isEnabled) {
      soundManager.play('click', 0.3);
    }
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
    soundManager.play('click', 0.2);
  };

  const showTempNotification = (message: string, type: GameState['feedbackType'] = 'info') => {
    setGameState(prev => ({ ...prev, feedbackMessage: message, feedbackType: type }));
    setShowNotification(true);

    // Play sound based on notification type
    if (type === 'success') {
      soundManager.play('success', 0.4);
    } else if (type === 'error') {
      soundManager.play('error', 0.4);
    } else {
      soundManager.play('click', 0.3);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const loadChallenge = (level: number) => {
    if (level < CHALLENGES.length) {
      setGameState(prev => ({
        ...prev,
        currentChallenge: CHALLENGES[level],
        currentLevel: level,
        feedbackMessage: `Level ${level + 1}: ${CHALLENGES[level].description}`,
        feedbackType: 'info',
        selectedType: null,
        inputAngle: '',
      }));
      setChallengeStartTime(Date.now());
      setShowHint(false);
      soundManager.play('click', 0.3);
    } else {
      // Game Complete! - Animate pyramid completion
      setAnimatePyramid(true);
      setGameState(prev => ({
        ...prev,
        currentChallenge: null,
        feedbackMessage: 'Magnificent! The pyramid is complete! You are a Master Architect!',
        feedbackType: 'success'
      }));
      soundManager.play('achievement', 0.5);
      checkAchievements();
      
      // Show completion animation
      setTimeout(() => {
        setAnimatePyramid(false);
      }, 3000);
    }
  };

  // Game Logic Functions
  const startGame = () => {
    if (tempPharaohName.trim() === '') {
      showTempNotification("Please enter your Pharaoh's name!", 'error');
      return;
    }
    setGameState(prev => ({
      ...prev,
      pharaohName: tempPharaohName,
      gameStarted: true,
      currentLevel: 0,
      pyramidProgress: 0,
      knowledgePoints: 0,
    }));
    setAchievements(ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false })));
    setStreak(0);
    soundManager.play('click', 0.3);
  };

  const handleAngleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGameState(prev => ({ ...prev, inputAngle: value }));
    }
  };

  const handleTypeSelect = (type: TriangleType) => {
    setGameState(prev => ({ ...prev, selectedType: type }));
    soundManager.play('click', 0.2);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    soundManager.play('click', 0.2);
  };

  const checkAchievements = useCallback(() => {
    setAchievements(prevAchievements => {
      let changed = false;
      const updatedAchievements = prevAchievements.map(ach => {
        if (!ach.unlocked && ach.condition(gameState)) {
          if (!prevAchievements.find(pa => pa.id === ach.id)?.unlocked) {
            showTempNotification(`Achievement Unlocked: ${ach.name}!`, 'success');
            soundManager.play('achievement', 0.5);
            changed = true;
          }
          return { ...ach, unlocked: true };
        }
        return ach;
      });
      return changed ? updatedAchievements : prevAchievements;
    });
  }, [gameState]);

  const checkTimeAchievement = () => {
    if (challengeStartTime) {
      const timeElapsed = (Date.now() - challengeStartTime) / 1000;
      if (timeElapsed < 10) {
        // Unlock quick thinker achievement
        setAchievements(prev => {
          const updated = prev.map(ach => {
            if (ach.id === 'quick_thinker' && !ach.unlocked) {
              showTempNotification(`Achievement Unlocked: ${ach.name}!`, 'success');
              soundManager.play('achievement', 0.5);
              return { ...ach, unlocked: true };
            }
            return ach;
          });
          return updated;
        });
      }
    }
  };

  const handleSubmitAnswer = () => {
    if (!gameState.currentChallenge) return;

    const submittedAngle = parseInt(gameState.inputAngle, 10);
    const submittedType = gameState.selectedType;

    // Basic Validation
    if (isNaN(submittedAngle) || submittedType === null) {
      setGameState(prev => ({
        ...prev,
        feedbackMessage: 'Please enter a valid angle and select a triangle type.',
        feedbackType: 'error'
      }));
      soundManager.play('error', 0.3);
      return;
    }

    const { missingAngle, correctType, reward, level } = gameState.currentChallenge;
    const isAngleCorrect = submittedAngle === missingAngle;
    const isTypeCorrect = submittedType === correctType;

    if (isAngleCorrect && isTypeCorrect) {
      // Correct Answer
      const newKnowledgePoints = gameState.knowledgePoints + reward;
      const progressIncrement = 100 / CHALLENGES.length;
      const newProgress = Math.min(100, gameState.pyramidProgress + progressIncrement);
      
      // Play success sound
      soundManager.play('success', 0.4);
      
      // Check time-based achievement
      checkTimeAchievement();
      
      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Check perfectionist achievement
      if (newStreak >= 5) {
        setAchievements(prev => {
          const updated = prev.map(ach => {
            if (ach.id === 'perfectionist' && !ach.unlocked) {
              showTempNotification(`Achievement Unlocked: ${ach.name}!`, 'success');
              soundManager.play('achievement', 0.5);
              return { ...ach, unlocked: true };
            }
            return ach;
          });
          return updated;
        });
      }

      // Animate pyramid progress update
      setAnimatePyramid(true);
      setTimeout(() => setAnimatePyramid(false), 1000);

      setGameState(prev => ({
        ...prev,
        knowledgePoints: newKnowledgePoints,
        pyramidProgress: newProgress,
        feedbackMessage: `Correct! +${reward} Knowledge. Block placed!`,
        feedbackType: 'success',
      }));

      checkAchievements();

      // Load next level
      setTimeout(() => {
        loadChallenge(level + 1);
      }, 1500);

    } else {
      // Incorrect Answer
      setStreak(0); // Reset streak on error
      
      // Play error sound
      soundManager.play('error', 0.3);
      
      let errorMessage = 'Incorrect. ';
      if (!isAngleCorrect && isTypeCorrect) {
        errorMessage += `The type is right, but check your angle calculation! Remember the sum is 180°.`;
      } else if (isAngleCorrect && !isTypeCorrect) {
        errorMessage += `The angle is correct, but this is not a ${submittedType} triangle.`;
      } else {
        errorMessage += `Check both your angle calculation and triangle classification.`;
      }
      
      setGameState(prev => ({
        ...prev,
        feedbackMessage: errorMessage,
        feedbackType: 'error'
      }));
    }
  };

  const nextTutorialStep = () => {
    const newStep = tutorialStep + 1;
    
    if (newStep >= TUTORIAL_STEPS.length) {
      setShowTutorial(false);
      setTutorialStep(0);
    } else {
      setTutorialStep(newStep);
    }
    
    soundManager.play('click', 0.3);
  };

  const renderHintContent = () => {
    if (!gameState.currentChallenge) return null;
    
    const { givenAngles, correctType } = gameState.currentChallenge;
    const knownSum = givenAngles.reduce((sum, angle) => sum + (angle || 0), 0);
    
    return (
      <div className="p-4 bg-amber-50 dark:bg-gray-700/50 rounded-md border border-amber-200 dark:border-gray-600 mb-4">
        <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2">Hint:</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          The sum of all angles in a triangle is always 180°.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Known angles sum: {knownSum}°<br />
          Missing angle = 180° - {knownSum}° = {180 - knownSum}°
        </p>
        <div className="mt-3 pt-3 border-t border-amber-200 dark:border-gray-600">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Triangle Types:
          </p>
          <ul className="text-xs text-gray-600 dark:text-gray-300 mt-1 space-y-1">
            <li>• <strong>Equilateral:</strong> All angles = 60°</li>
            <li>• <strong>Isosceles:</strong> Two angles are equal</li>
            <li>• <strong>Right:</strong> Has one 90° angle</li>
            <li>• <strong>Scalene:</strong> All angles are different</li>
          </ul>
        </div>
      </div>
    );
  };

  if (!gameState.gameStarted) {
    return (
      <div className={`min-h-screen ${theme === 'day' ? 'bg-amber-50' : 'dark bg-gray-900'}`}>
        <Header 
          gameState={gameState} 
          theme={theme} 
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />
        <StartScreen 
          tempPharaohName={tempPharaohName}
          setTempPharaohName={setTempPharaohName}
          startGame={startGame}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-12 ${theme === 'day' ? 'bg-amber-50' : 'dark bg-gray-900'}`}>
      <Header 
        gameState={gameState} 
        theme={theme} 
        toggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
      />
      
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed right-4 bottom-4 z-50">
        <button
          onClick={toggleMobileSidebar}
          className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Toggle game information"
        >
          {showMobileSidebar ? '✕' : 'ℹ️'}
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main game area */}
          <div className="w-full lg:w-2/3 p-6 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-lg">
            {gameState.currentChallenge ? (
              <>
                <ChallengeArea 
                  gameState={gameState}
                  handleAngleInput={handleAngleInput}
                  handleTypeSelect={handleTypeSelect}
                  handleSubmitAnswer={handleSubmitAnswer}
                  triangleTypes={TRIANGLE_TYPES}
                />
                
                {/* Hint toggle button */}
                <div className="mt-4 text-center">
                  <button 
                    onClick={toggleHint}
                    className="text-sm text-amber-600 dark:text-amber-400 hover:underline focus:outline-none"
                  >
                    {showHint ? 'Hide Hint' : 'Need a Hint?'}
                  </button>
                </div>
                
                {/* Hint content */}
                {showHint && renderHintContent()}
              </>
            ) : (
              <div className="py-10 text-center">
                <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                  Congratulations, Master Architect!
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  You have completed all challenges and built a magnificent pyramid for Pharaoh {gameState.pharaohName}.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  Final Score: <span className="font-bold text-amber-600 dark:text-amber-400">{gameState.knowledgePoints}</span> Knowledge Points
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-md transition-all shadow-md hover:shadow-lg"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Side panel - Desktop visible, mobile hidden */}
          <div className={`w-full lg:w-1/3 transition-all duration-300 ${
            showMobileSidebar 
              ? 'fixed inset-0 z-40 p-4 bg-black/70 lg:relative lg:bg-transparent lg:p-0'
              : 'hidden lg:block'
          }`}>
            <div className={`w-full h-full overflow-auto p-4 ${
              showMobileSidebar ? 'max-w-sm mx-auto mt-16' : ''
            }`}>
              {showMobileSidebar && (
                <button
                  onClick={toggleMobileSidebar}
                  className="absolute top-4 right-4 text-white text-xl"
                >
                  ✕
                </button>
              )}
              <GameInfo 
                pyramidProgress={gameState.pyramidProgress} 
                triangleTypes={TRIANGLE_TYPES}
                achievements={achievements}
                animatePyramid={animatePyramid}
              />
            </div>
          </div>
        </div>
      </div>
      
      {showTutorial && (
        <Tutorial
          step={tutorialStep}
          totalSteps={TUTORIAL_STEPS.length}
          message={TUTORIAL_STEPS[tutorialStep].replace('[PharaohName]', gameState.pharaohName)}
          onNext={nextTutorialStep}
        />
      )}
      
      {showNotification && (
        <Notification 
          message={gameState.feedbackMessage} 
          type={gameState.feedbackType}
        />
      )}
    </div>
  );
};

export default PyramidBuilders; 