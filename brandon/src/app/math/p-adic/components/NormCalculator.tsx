import React, { useState, useEffect } from 'react';
import { calculateNorm } from '../utils/pAdicUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Target, Zap, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NormCalculatorProps {
  prime?: number;
}

const NormCalculator: React.FC<NormCalculatorProps> = ({ prime = 2 }) => {
  const [numberInput, setNumberInput] = useState('');
  const [precision, setPrecision] = useState('5');
  const [result, setResult] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState(false);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<{ number: string; answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const calculate = () => {
    try {
      const norm = calculateNorm(numberInput, prime, parseInt(precision));
      setResult(norm);
      setFeedback(null);
    } catch (error) {
      setResult(null);
    }
  };

  const generateChallenge = () => {
    // Generate interesting p-adic norm challenges
    const challenges = [
      { number: '1/3', answer: calculateNorm('1/3', prime, 5) },
      { number: '4', answer: calculateNorm('4', prime, 5) },
      { number: '1/8', answer: calculateNorm('1/8', prime, 5) },
      { number: '15', answer: calculateNorm('15', prime, 5) }
    ];
    
    const newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(newChallenge);
    setUserAnswer('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!challenge) return;

    const userNorm = parseFloat(userAnswer);
    const expectedNorm = challenge.answer;
    
    // Allow for some floating-point imprecision
    const isCorrect = Math.abs(userNorm - expectedNorm) < 1e-10;

    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setScore(prev => prev + 1);
      setFeedback('correct');
      setTimeout(generateChallenge, 1500);
    } else {
      setScore(0);
      setFeedback('incorrect');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>p-adic Norm Calculator</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={gameMode ? "default" : "outline"}
              onClick={() => {
                setGameMode(!gameMode);
                if (!gameMode) generateChallenge();
              }}
            >
              {gameMode ? "Exit Game" : "Play Game"}
              <Zap className="ml-2 h-4 w-4" />
            </Button>
            {gameMode && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Score: {score}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!gameMode ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Enter number (e.g., 1/3 or 5)"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                className="text-lg"
              />
              <Input
                type="number"
                placeholder="Precision"
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                min="1"
                max="20"
                className="text-lg"
              />
            </div>
            
            <Button onClick={calculate} className="w-full">
              Calculate Norm
            </Button>

            {result !== null && (
              <div className="text-center text-xl font-mono p-4 bg-gray-900 rounded-lg animate-fade-in">
                <div className="text-white">
                  |{numberInput}|<sub>{prime}</sub> = {result.toExponential(4)}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  The smaller the norm, the more divisible by {prime} the number is.
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {challenge && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Calculate the {prime}-adic norm</h3>
                  <div className="text-3xl font-mono">|{challenge.number}|<sub>{prime}</sub></div>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={`text-lg ${
                      feedback === 'correct'
                        ? 'border-green-500'
                        : feedback === 'incorrect'
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  <Button onClick={checkAnswer} className="min-w-[100px]">
                    Check <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {feedback && (
                  <div
                    className={`p-4 rounded-lg text-center ${
                      feedback === 'correct'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {feedback === 'correct' ? (
                      <div className="flex items-center justify-center gap-2">
                        <Award className="h-5 w-5" />
                        <span>Correct! Great job!</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Target className="h-5 w-5" />
                        <span>Try again! Remember that p-adic norms measure divisibility by {prime}.</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Tips:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>The p-adic norm measures divisibility by {prime}</li>
                    <li>The more times a number is divisible by {prime}, the smaller its norm</li>
                    <li>For fractions, consider both numerator and denominator</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NormCalculator;
