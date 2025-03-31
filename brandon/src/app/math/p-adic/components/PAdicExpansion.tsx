import React, { useState, useEffect } from 'react';
import { calculatePAdicExpansion, calculateNorm } from '../utils/pAdicUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Award, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PAdicExpansionProps {
  prime?: number;
}

const PAdicExpansion: React.FC<PAdicExpansionProps> = ({ prime = 2 }) => {
  const [number, setNumber] = useState<string>('1/3');
  const [precision, setPrecision] = useState<string>('5');
  const [expansion, setExpansion] = useState<number[]>([]);
  const [norm, setNorm] = useState<number | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [challenge, setChallenge] = useState<{number: string; hint: string} | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [userGuess, setUserGuess] = useState<string>('');
  const [gameMode, setGameMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const prec = parseInt(precision, 10);
      if (isNaN(prec)) throw new Error('Invalid precision');
      const exp = calculatePAdicExpansion(number, prime, prec);
      setExpansion(exp);
      setNorm(calculateNorm(number, prime, prec));
    } catch (error) {
      setExpansion([]);
      setNorm(null);
    }
  }, [prime, number, precision]);

  const generateChallenge = () => {
    const challenges = [
      { number: '1/3', hint: "This fraction has a repeating p-adic expansion" },
      { number: '2/5', hint: "Try to find the pattern in the digits" },
      { number: '7', hint: "What happens with integers in p-adic expansions?" },
      { number: '1/4', hint: "Think about powers of 2 in the denominator" }
    ];
    const newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(newChallenge);
    setShowSolution(false);
    setUserGuess('');
  };

  const checkAnswer = () => {
    if (!challenge) return;
    
    try {
      const userExp = calculatePAdicExpansion(userGuess, prime, 5);
      const correctExp = calculatePAdicExpansion(challenge.number, prime, 5);
      
      const isCorrect = userExp.every((digit, i) => digit === correctExp[i]);
      
      if (isCorrect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setStreak(prev => prev + 1);
        if (streak > 0 && streak % 5 === 0) {
          setTimeout(() => {
            confetti({
              particleCount: 200,
              spread: 90,
              origin: { y: 0.6 }
            });
          }, 300);
        }
        setTimeout(generateChallenge, 1500);
      } else {
        setStreak(0);
      }
    } catch (error) {
      setStreak(0);
    }
  };

  const renderExpansion = (exp: number[]) => {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-2xl font-mono animate-fade-in">
          {number} = {exp.map((d, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300 hover:scale-110"
              style={{
                color: `hsl(${(360 / prime) * d}, 70%, 50%)`,
                textShadow: '0 0 10px currentColor',
              }}
            >
              {d}·{prime}<sup>{i}</sup>
              {i < exp.length - 1 ? ' + ' : ''}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          {exp.map((d, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transform hover:scale-110 transition-transform"
              style={{
                backgroundColor: `hsl(${(360 / prime) * d}, 70%, 50%)`,
                boxShadow: `0 0 15px hsl(${(360 / prime) * d}, 70%, 30%)`,
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>p-adic Expansion Explorer</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={gameMode ? "default" : "outline"}
              onClick={() => setGameMode(!gameMode)}
            >
              {gameMode ? "Exit Game" : "Play Game"}
              <Zap className="ml-2 h-4 w-4" />
            </Button>
            {gameMode && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Star className="h-4 w-4" />
                Streak: {streak}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!gameMode ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Number (e.g., 1/3 or 5)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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

            {expansion.length > 0 && (
              <>
                {renderExpansion(expansion)}
                <div className="text-center text-lg text-gray-600 dark:text-gray-400 mt-4">
                  p-adic norm: |{number}|<sub>{prime}</sub> = {norm?.toExponential(4)}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="space-y-6">
            {!challenge ? (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={generateChallenge}
                  className="animate-bounce"
                >
                  Start Challenge
                  <Award className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 mt-0.5 text-blue-500" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Challenge</h4>
                      <p className="text-blue-800 dark:text-blue-200">
                        Find the p-adic expansion of {challenge.number}
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                        Hint: {challenge.hint}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Enter your answer (e.g., 1/3)"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    className="text-lg"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={checkAnswer}
                      className="w-full"
                    >
                      Check Answer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      {showSolution ? "Hide" : "Show"} Solution
                    </Button>
                  </div>
                </div>

                {showSolution && expansion.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Solution:</h4>
                    {renderExpansion(expansion)}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PAdicExpansion;
