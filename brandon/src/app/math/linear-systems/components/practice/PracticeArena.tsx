import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function PracticeArena() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const problems = {
    easy: {
      system: "2x + y = 5\nx - y = 1",
      solution: "x = 2, y = 1"
    },
    medium: {
      system: "3x - 2y + z = 1\n2x + y - z = 4\nx - y + 2z = -2",
      solution: "x = 1, y = -1, z = -1"
    },
    hard: {
      system: "2x + 3y - z + w = 8\nx - y + 2z - w = 1\n3x + y + z + 2w = 12\n-x + 2y - z - w = -3",
      solution: "x = 2, y = 1, z = -1, w = 3"
    }
  };

  const checkAnswer = () => {
    // Simple check - in real implementation, would need more sophisticated comparison
    if (userAnswer.toLowerCase().replace(/\s/g, '') === 
        problems[difficulty].solution.toLowerCase().replace(/\s/g, '')) {
      setFeedback("Correct! Well done!");
    } else {
      setFeedback("Not quite right. Try again!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button 
          variant={difficulty === 'easy' ? 'default' : 'outline'}
          onClick={() => setDifficulty('easy')}
        >
          Easy
        </Button>
        <Button 
          variant={difficulty === 'medium' ? 'default' : 'outline'}
          onClick={() => setDifficulty('medium')}
        >
          Medium
        </Button>
        <Button 
          variant={difficulty === 'hard' ? 'default' : 'outline'}
          onClick={() => setDifficulty('hard')}
        >
          Hard
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Solve this system:</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 font-mono">
          {problems[difficulty].system}
        </pre>
        
        <Textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your solution (e.g., x = 1, y = 2)"
          className="mb-4"
        />
        
        <Button onClick={checkAnswer}>Check Answer</Button>
        
        {feedback && (
          <p className={`mt-4 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </p>
        )}
      </Card>
    </div>
  );
}