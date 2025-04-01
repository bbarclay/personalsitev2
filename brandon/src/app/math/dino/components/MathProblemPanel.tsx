import React, { useState, useMemo } from 'react';
import { ERA_MATH_CONTENT } from '../constants/math-concepts';
import { EraId } from '../utils/era-utils';
import { MathVisualizer } from './MathVisualizer';

interface MathProblemPanelProps {
  darkMode: boolean;
  currentEra: EraId;
  onAnswerSubmit: (correct: boolean) => void;
}

export const MathProblemPanel: React.FC<MathProblemPanelProps> = ({
  darkMode,
  currentEra,
  onAnswerSubmit
}) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showWorkspace, setShowWorkspace] = useState(false);

  const eraContent = ERA_MATH_CONTENT[currentEra];
  const currentProblem = eraContent.problems[currentProblemIndex];

  // Generate visualization data based on the current problem
  const visualizationData = useMemo(() => {
    switch (currentEra) {
      case 'triassic':
        // For proportional reasoning, generate comparative sizes
        return [30, 60, 90, 100];
      case 'jurassic':
        // For geometric shapes, generate number of sides
        return [3, 4, 5, 6];
      case 'cretaceous':
        // For probability, generate random success rates
        return Array.from({ length: 10 }, () => Math.random());
      default:
        return [];
    }
  }, [currentEra, currentProblemIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    onAnswerSubmit(answerIndex === currentProblem.answer);
  };

  const handleNextProblem = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowWorkspace(false);
    setCurrentProblemIndex((prev) => 
      (prev + 1) % eraContent.problems.length
    );
  };

  return (
    <div className={`
      rounded-xl p-6
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-lg transition-all duration-300
    `}>
      {/* Problem Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Math Challenge</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm opacity-80">
            Problem {currentProblemIndex + 1} of {eraContent.problems.length}
          </div>
          <button
            onClick={() => setShowWorkspace(prev => !prev)}
            className={`
              px-3 py-1 rounded-lg text-sm
              ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
              hover:opacity-80 transition-opacity
            `}
          >
            {showWorkspace ? 'Hide' : 'Show'} Workspace
          </button>
        </div>
      </div>

      {/* Problem Content */}
      <div className="space-y-6">
        {/* Question */}
        <div>
          <p className="text-lg mb-4">{currentProblem.question}</p>
          <div className="grid gap-2">
            {currentProblem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full p-3 rounded-lg text-left
                  transition-all duration-300
                  ${selectedAnswer === null
                    ? darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                    : ''
                  }
                  ${getAnswerStyle(index, selectedAnswer, currentProblem.answer)}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Math Visualization Workspace */}
        {showWorkspace && (
          <div className="mt-6 border-t pt-4">
            <MathVisualizer
              darkMode={darkMode}
              currentEra={currentEra}
              concept={eraContent.mathConcepts[0]}
              data={visualizationData}
            />
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className={`
            p-4 rounded-lg mt-4
            ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
          `}>
            <h4 className="font-bold mb-2">Explanation:</h4>
            <p>{currentProblem.explanation}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm opacity-80">
            {showExplanation ? 'Ready for next problem?' : 'Select your answer'}
          </div>
          {showExplanation && (
            <button
              onClick={handleNextProblem}
              className="
                px-4 py-2 rounded-lg
                bg-blue-500 text-white
                hover:bg-blue-600 transition-colors
              "
            >
              Next Problem
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function getAnswerStyle(
  index: number,
  selected: number | null,
  correct: number
): string {
  if (selected === null) return '';
  
  if (index === correct) {
    return 'bg-green-500 text-white';
  }
  
  if (index === selected && selected !== correct) {
    return 'bg-red-500 text-white';
  }
  
  return 'opacity-50';
}
