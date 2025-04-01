'use client';

import React, { useState, useEffect } from 'react';
import { EraId, getRandomFact, ERAS } from '../utils/era-utils';
import { getRandomDinosaur } from '../utils/era-utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { randomColor } from '@/app/math/geometry/coordinate-geometry/utils/colors';

interface DinoQuizProps {
  currentEra: EraId;
  darkMode: boolean;
  onComplete: (score: number) => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  answered?: boolean;
  selectedIndex?: number;
}

export function DinoQuiz({ currentEra, darkMode, onComplete }: DinoQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fact, setFact] = useState('');

  // Generate questions based on the current era when it changes
  useEffect(() => {
    const newQuestions = generateQuestions(currentEra, 5);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
    setShowExplanation(false);
    // Show a random fact when the quiz starts
    setFact(getRandomFact(currentEra));
  }, [currentEra]);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (selectedIndex: number) => {
    if (!currentQuestion || currentQuestion.answered) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    
    // Update the current question
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQuestion,
      answered: true,
      selectedIndex
    };
    
    setQuestions(updatedQuestions);
    setShowExplanation(true);
    
    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
      setFact(getRandomFact(currentEra)); // Show a new fact for each question
    } else {
      setCompleted(true);
      onComplete(score);
    }
  };

  const generateQuestions = (era: EraId, count: number): Question[] => {
    const questions: Question[] = [];
    const eraInfo = ERAS[era];
    
    // Question types for each era
    const questionTypes = [
      // Diet questions
      {
        generator: () => {
          const dino = getRandomDinosaur(era);
          const dietTypes = ['herbivore', 'carnivore', 'omnivore'];
          const correctIndex = Math.floor(Math.random() * dietTypes.length);
          
          return {
            question: `Was ${dino} a herbivore, carnivore, or omnivore?`,
            options: dietTypes,
            correctIndex,
            explanation: `${dino} was a ${dietTypes[correctIndex]}, which means it ate ${
              correctIndex === 0 ? 'plants' : correctIndex === 1 ? 'meat' : 'both plants and meat'
            }.`
          };
        }
      },
      // Time period questions
      {
        generator: () => {
          const period = eraInfo.period;
          const options = [
            period,
            `${parseInt(period.split('-')[0]) + 50}-${parseInt(period.split('-')[1]) + 50} million years ago`,
            `${parseInt(period.split('-')[0]) - 50}-${parseInt(period.split('-')[1]) - 50} million years ago`,
          ];
          
          return {
            question: `When was the ${eraInfo.name} period?`,
            options: options.sort(() => Math.random() - 0.5),
            correctIndex: options.indexOf(period),
            explanation: `The ${eraInfo.name} period was ${period}.`
          };
        }
      },
      // Climate questions
      {
        generator: () => {
          const climate = eraInfo.climate;
          const options = [
            climate,
            'Cold and icy with polar caps',
            'Mild with seasonal monsoons',
            'Extremely hot and arid deserts'
          ].filter(c => c !== climate).slice(0, 2);
          options.push(climate);
          
          return {
            question: `What was the climate like during the ${eraInfo.name} period?`,
            options: options.sort(() => Math.random() - 0.5),
            correctIndex: options.indexOf(climate),
            explanation: `During the ${eraInfo.name} period, the climate was ${climate.toLowerCase()}.`
          };
        }
      },
      // Dinosaur feature questions
      {
        generator: () => {
          const dino = getRandomDinosaur(era);
          const features = [
            'sharp teeth for hunting',
            'long neck for reaching tall vegetation',
            'powerful legs for running',
            'armor plates for protection'
          ];
          const correctIndex = Math.floor(Math.random() * features.length);
          
          return {
            question: `What feature might ${dino} have had?`,
            options: features,
            correctIndex,
            explanation: `${dino} likely had ${features[correctIndex]}, which helped it survive in its environment.`
          };
        }
      },
      // Vegetation questions
      {
        generator: () => {
          const vegetation = eraInfo.vegetation;
          const options = [
            vegetation,
            'Tall grasses and flowering plants',
            'Moss and primitive plants',
            'Tropical palm trees'
          ].filter(v => v !== vegetation).slice(0, 2);
          options.push(vegetation);
          
          return {
            question: `What was the main vegetation during the ${eraInfo.name} period?`,
            options: options.sort(() => Math.random() - 0.5),
            correctIndex: options.indexOf(vegetation),
            explanation: `During the ${eraInfo.name} period, the main vegetation consisted of ${vegetation.toLowerCase()}.`
          };
        }
      }
    ];
    
    // Generate the specified number of questions
    for (let i = 0; i < count; i++) {
      const type = questionTypes[i % questionTypes.length];
      const questionData = type.generator();
      
      questions.push({
        id: `${era}-q${i}`,
        ...questionData
      });
    }
    
    return questions.sort(() => Math.random() - 0.5); // Shuffle questions
  };

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading quiz questions...</p>
      </div>
    );
  }

  return (
    <Card className={`
      p-6 max-w-xl mx-auto transition-all
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
    `}>
      {!completed ? (
        <>
          <div className="mb-4 flex justify-between">
            <div className="text-sm">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="text-sm font-bold">
              Score: {score}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
            
            <div className="grid gap-2">
              {currentQuestion.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={getButtonVariant(idx, currentQuestion)}
                  className="justify-start text-left h-auto py-3 font-normal"
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={currentQuestion.answered}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          
          {showExplanation && (
            <div className={`
              p-4 rounded-md mb-4
              ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
            `}>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
          
          <div className={`
            p-4 rounded-md mb-4 border-l-4
            ${darkMode ? 'bg-gray-700 border-amber-500' : 'bg-amber-50 border-amber-500'}
          `}>
            <div className="text-sm font-bold mb-1">Dino Fact:</div>
            <p className="text-sm">{fact}</p>
          </div>
          
          {currentQuestion.answered && (
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <div className="text-6xl mb-4">
            {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '🦖'}
          </div>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>
          <p className={`mb-6 ${score === questions.length ? 'text-green-500' : ''}`}>
            {score === questions.length 
              ? 'Perfect! You\'re a true dinosaur expert!' 
              : score >= questions.length / 2 
                ? 'Good job! You know a lot about dinosaurs.' 
                : 'Keep learning about dinosaurs and try again!'}
          </p>
          <Button onClick={() => {
            const newQuestions = generateQuestions(currentEra, 5);
            setQuestions(newQuestions);
            setCurrentIndex(0);
            setScore(0);
            setCompleted(false);
            setShowExplanation(false);
            setFact(getRandomFact(currentEra));
          }}>
            Play Again
          </Button>
        </div>
      )}
    </Card>
  );
}

function getButtonVariant(
  index: number,
  question: Question
): 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null {
  if (!question.answered) {
    return 'outline';
  }
  
  if (index === question.correctIndex) {
    return 'default'; // Green for correct answer
  }
  
  if (index === question.selectedIndex) {
    return 'destructive'; // Red for wrong selection
  }
  
  return 'ghost'; // Grey out other options
} 