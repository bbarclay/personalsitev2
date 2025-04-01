import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCollatz } from '../../hooks/useCollatz';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  type: 'proof' | 'optimization' | 'pattern' | 'implementation';
  instructions: string;
  hints: string[];
  completed: boolean;
}

export function ChallengePanel() {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [userSolution, setUserSolution] = useState('');
  const [shownHints, setShownHints] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { calculateSequence } = useCollatz();

  // Mock data - replace with actual challenges
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Proof for Powers of 2',
      description: 'Prove that any power of 2 will reach 1 in exactly log₂(n) steps.',
      difficulty: 'intermediate',
      type: 'proof',
      instructions: 'Write a mathematical proof explaining why powers of 2 always reach 1 in log₂(n) steps. Provide step-by-step reasoning.',
      hints: [
        'Consider what happens when you apply the Collatz function to a power of 2.',
        'When n is even, the next number is n/2. How many times can you divide a power of 2 by 2 before reaching 1?',
        'For 2^k, you need exactly k divisions by 2 to reach 1, with no odd numbers in between.'
      ],
      completed: false
    },
    {
      id: '2',
      title: 'Sequence Optimization',
      description: 'Optimize the algorithm for calculating long Collatz sequences.',
      difficulty: 'advanced',
      type: 'optimization',
      instructions: 'Implement an optimized version of the Collatz sequence calculator that can handle very large starting numbers efficiently. Consider techniques like memoization.',
      hints: [
        'Store previously calculated results to avoid redundant calculations.',
        'Notice that once you reach a number below your starting point, you can reuse previous calculations.',
        'Consider using BigInt for handling large numbers in JavaScript.'
      ],
      completed: false
    },
    {
      id: '3',
      title: 'Pattern Detection',
      description: 'Implement an algorithm to detect patterns in Collatz sequences.',
      difficulty: 'expert',
      type: 'pattern',
      instructions: 'Create an algorithm that can identify recurring patterns in Collatz sequences. Focus on detecting cycles, growth patterns, and other notable features.',
      hints: [
        'Look for repeating subsequences within the sequence.',
        'Analyze the relationship between consecutive terms.',
        'Consider using statistical methods to identify patterns in large datasets.'
      ],
      completed: false
    },
    {
      id: '4',
      title: 'Parallel Processing',
      description: 'Implement a parallel processing solution for batch Collatz calculations.',
      difficulty: 'expert',
      type: 'implementation',
      instructions: 'Design and implement a solution that leverages parallel processing to calculate Collatz sequences for a large range of starting numbers efficiently.',
      hints: [
        'Web Workers can be used for parallel processing in browsers.',
        'Divide the range of numbers into chunks that can be processed independently.',
        'Consider how to efficiently merge and analyze results from parallel calculations.'
      ],
      completed: false
    }
  ];

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300';
      case 'advanced':
        return 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300';
      case 'expert':
        return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'proof':
        return '📝';
      case 'optimization':
        return '⚡';
      case 'pattern':
        return '🔍';
      case 'implementation':
        return '💻';
      default:
        return '🧩';
    }
  };

  const handleStartChallenge = (challengeId: string) => {
    setActiveChallenge(challengeId);
    setUserSolution('');
    setShownHints([]);
  };

  const handleShowHint = (index: number) => {
    if (!shownHints.includes(index)) {
      setShownHints([...shownHints, index]);
    }
  };

  const handleSubmitSolution = async () => {
    setIsSubmitting(true);
    setProgress(0);

    // Simulate submission evaluation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }

    if (activeChallenge) {
      const challenge = challenges.find(c => c.id === activeChallenge);
      if (challenge) {
        challenge.completed = true;
      }
    }

    setIsSubmitting(false);
    setActiveChallenge(null);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Research Challenges</h2>
          <Badge variant="outline">
            {challenges.length} Challenges
          </Badge>
        </div>

        {activeChallenge ? (
          <div className="space-y-4">
            {challenges.map(challenge => (
              challenge.id === activeChallenge && (
                <div key={challenge.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getTypeIcon(challenge.type)}</span>
                      <h3 className="font-medium">{challenge.title}</h3>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                      <div className="bg-muted p-4 rounded">
                        <h4 className="font-medium mb-2">Instructions:</h4>
                        <p className="text-sm">{challenge.instructions}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Your Solution:</h4>
                        <Textarea
                          value={userSolution}
                          onChange={(e) => setUserSolution(e.target.value)}
                          placeholder="Enter your solution here..."
                          className="min-h-[200px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Hints:</h4>
                          <span className="text-xs text-muted-foreground">
                            {shownHints.length} of {challenge.hints.length} shown
                          </span>
                        </div>
                        <div className="space-y-2">
                          {challenge.hints.map((hint, index) => (
                            <div key={index}>
                              {shownHints.includes(index) ? (
                                <p className="text-sm p-2 bg-muted rounded">{hint}</p>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleShowHint(index)}
                                >
                                  Show Hint {index + 1}
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {isSubmitting && (
                        <div className="space-y-2">
                          <Progress value={progress} className="h-2" />
                          <p className="text-sm text-muted-foreground">
                            Evaluating solution... {progress}%
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveChallenge(null)}
                    >
                      Back to Challenges
                    </Button>
                    <Button
                      onClick={handleSubmitSolution}
                      disabled={isSubmitting || !userSolution.trim()}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Solution'}
                    </Button>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {challenges.map(challenge => (
              <Card key={challenge.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getTypeIcon(challenge.type)}</span>
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {challenge.type}
                    </Badge>
                    <Button
                      onClick={() => handleStartChallenge(challenge.id)}
                      disabled={challenge.completed}
                    >
                      {challenge.completed ? 'Completed' : 'Start Challenge'}
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