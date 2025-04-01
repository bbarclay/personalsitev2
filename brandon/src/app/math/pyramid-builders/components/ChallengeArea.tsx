"use client";

import React from 'react';
import { GameState, TriangleTypeInfo, TriangleType } from '../types';
import TriangleVisual from './TriangleVisual';

interface ChallengeAreaProps {
  gameState: GameState;
  handleAngleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeSelect: (type: TriangleType) => void;
  handleSubmitAnswer: () => void;
  triangleTypes: TriangleTypeInfo[];
}

const ChallengeArea: React.FC<ChallengeAreaProps> = ({
  gameState,
  handleAngleInput,
  handleTypeSelect,
  handleSubmitAnswer,
  triangleTypes
}) => {
  if (!gameState.currentChallenge) {
    return null;
  }

  // Calculate the sum of known angles
  const knownAngles = gameState.currentChallenge.givenAngles.filter(angle => angle !== null) as number[];
  const knownSum = knownAngles.reduce((sum, angle) => sum + angle, 0);

  // Function to handle Enter key press on angle input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && gameState.inputAngle && gameState.selectedType) {
      handleSubmitAnswer();
    }
  };

  return (
    <div>
      <div className="mb-6 py-3 text-center border-b border-amber-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="inline-block px-2 py-1 text-xs bg-amber-500 text-white rounded">
            Level {gameState.currentLevel + 1}
          </span>
          <span className="text-lg font-medium text-amber-700 dark:text-amber-300 text-center">
            {gameState.currentChallenge.description}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around mb-8 gap-8">
        <div className="relative">
          <TriangleVisual challenge={gameState.currentChallenge} />
          
          {/* Level reward indicator */}
          <div className="absolute top-1 right-1 bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-amber-300 text-xs rounded-md px-2 py-1 shadow-sm border border-amber-200 dark:border-gray-600">
            <span className="font-medium">Reward:</span> +{gameState.currentChallenge.reward} Knowledge
          </div>
        </div>
        
        <div className="text-center bg-amber-50/70 dark:bg-gray-800/70 p-4 rounded-lg border border-amber-100 dark:border-gray-700 min-w-[250px]">
          <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2">
            Known Angles
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {gameState.currentChallenge.givenAngles.map((angle, i) => (
              <div 
                key={i} 
                className={`font-mono text-lg px-3 py-1 rounded-md ${
                  angle !== null 
                    ? 'bg-white dark:bg-gray-700 border border-amber-200 dark:border-gray-600'
                    : 'bg-amber-100/50 dark:bg-gray-700/50 border border-amber-300 dark:border-amber-700 border-dashed'
                }`}
              >
                {angle !== null ? `${angle}°` : ' ? '}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-medium">Known sum:</span> {knownSum}°
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            (Angles in a triangle sum to 180°)
          </div>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 border border-amber-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md">
            <label htmlFor="angleInput" className="block text-center font-medium text-amber-700 dark:text-amber-300 mb-2">
              What's the missing angle?
            </label>
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <input
                  type="number"
                  id="angleInput"
                  value={gameState.inputAngle}
                  onChange={handleAngleInput}
                  onKeyPress={handleKeyPress}
                  placeholder="?"
                  min="1"
                  max="179"
                  className="w-24 px-3 py-2 border border-amber-200 dark:border-gray-600 rounded-md bg-white/90 dark:bg-gray-700/90 text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500"
                  autoFocus
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">°</span>
              </div>
              
              <div className="text-gray-500 dark:text-gray-400">
                =
              </div>
              
              <div className="text-center px-3 py-2 bg-amber-50 dark:bg-gray-700 rounded-md border border-amber-100 dark:border-gray-600 min-w-[70px]">
                <span className="text-sm text-gray-500 dark:text-gray-400">180° - {knownSum}°</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <p className="text-center font-medium text-amber-700 dark:text-amber-300 mb-3">
              What type of triangle is this?
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2">
              {triangleTypes.map(typeInfo => (
                <button
                  key={typeInfo.name}
                  onClick={() => handleTypeSelect(typeInfo.name)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    gameState.selectedType === typeInfo.name
                      ? 'bg-amber-500 text-white font-medium shadow-md transform scale-105'
                      : 'bg-amber-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">{typeInfo.icon}</span>
                  <span>{typeInfo.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmitAnswer}
            disabled={!gameState.inputAngle || !gameState.selectedType}
            className="mt-4 px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-md transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none"
          >
            Submit Answer
          </button>
        </div>
      </div>

      <div className={`mt-6 p-4 rounded-md text-center font-medium transition-all duration-300 transform ${
        gameState.feedbackType !== 'info' ? 'scale-105' : 'scale-100'
      } ${
        gameState.feedbackType === 'success' 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
          : gameState.feedbackType === 'error'
            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
      }`}>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">
            {gameState.feedbackType === 'success' && '✅'}
            {gameState.feedbackType === 'error' && '❌'}
            {gameState.feedbackType === 'info' && 'ℹ️'}
          </span>
          <span>{gameState.feedbackMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeArea; 