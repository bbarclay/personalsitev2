import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useCollatz } from '../../hooks/useCollatz';

interface Game {
  id: string;
  title: string;
  description: string;
  type: 'sequence' | 'pattern' | 'prediction' | 'speed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rules: string[];
  score: number;
  highScore: number;
}

export function GamePanel() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const { calculateSequence } = useCollatz();

  // Mock data - replace with actual games
  const games: Game[] = [
    {
      id: '1',
      title: 'Sequence Master',
      description: 'Generate and identify patterns in Collatz sequences.',
      type: 'sequence',
      difficulty: 'beginner',
      rules: [
        'Enter a number to generate its Collatz sequence',
        'Identify patterns in the sequence',
        'Score points for correct pattern identification'
      ],
      score: 0,
      highScore: 100
    },
    {
      id: '2',
      title: 'Pattern Predictor',
      description: 'Predict the next number in a Collatz sequence.',
      type: 'prediction',
      difficulty: 'intermediate',
      rules: [
        'Given a sequence, predict the next number',
        'Get points for correct predictions',
        'Time limit: 60 seconds'
      ],
      score: 0,
      highScore: 200
    },
    {
      id: '3',
      title: 'Speed Challenge',
      description: 'Generate sequences as fast as possible.',
      type: 'speed',
      difficulty: 'advanced',
      rules: [
        'Generate sequences for given numbers',
        'Score points for speed and accuracy',
        'Beat your high score'
      ],
      score: 0,
      highScore: 300
    }
  ];

  const getDifficultyColor = (difficulty: Game['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300';
    }
  };

  const handleStartGame = (gameId: string) => {
    setActiveGame(gameId);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setUserInput('');
  };

  const handleEndGame = () => {
    setIsPlaying(false);
    if (activeGame) {
      const game = games.find(g => g.id === activeGame);
      if (game && score > game.highScore) {
        game.highScore = score;
      }
    }
  };

  const handleSubmitAnswer = () => {
    // Add game-specific logic here
    setScore(prev => prev + 10);
    setUserInput('');
  };

  const renderGameContent = (game: Game) => {
    switch (game.type) {
      case 'sequence':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Rules:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {game.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                min="1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter a number"
              />
              <Button onClick={handleSubmitAnswer}>Generate</Button>
            </div>
          </div>
        );
      case 'prediction':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Rules:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {game.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Predict next number"
              />
              <Button onClick={handleSubmitAnswer}>Submit</Button>
            </div>
          </div>
        );
      case 'speed':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Rules:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {game.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                min="1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter number quickly"
              />
              <Button onClick={handleSubmitAnswer}>Submit</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Interactive Games</h2>
          <Badge variant="outline">
            {games.length} Games
          </Badge>
        </div>

        {activeGame ? (
          <div className="space-y-4">
            {games.map(game => (
              game.id === activeGame && (
                <div key={game.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {game.description}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                  </div>

                  {isPlaying && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Time Left: {timeLeft}s</span>
                        <span className="text-sm">Score: {score}</span>
                      </div>
                      <Progress value={(timeLeft / 60) * 100} className="h-2" />
                    </div>
                  )}

                  <Card className="p-4">
                    {renderGameContent(game)}
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleEndGame}
                    >
                      End Game
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveGame(null)}
                    >
                      Exit Game
                    </Button>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {games.map(game => (
              <Card key={game.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {game.description}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        High Score: {game.highScore}
                      </Badge>
                    </div>
                    <Button onClick={() => handleStartGame(game.id)}>
                      Start Game
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
} 