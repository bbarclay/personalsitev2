import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useCollatz } from '../../hooks/useCollatz';

interface Pattern {
  id: string;
  name: string;
  description: string;
  example: string;
  frequency: number;
}

export function PatternAnalyzer() {
  const [input, setInput] = useState('');
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { calculateSequence } = useCollatz();

  // Mock patterns - replace with actual pattern detection
  const mockPatterns: Pattern[] = [
    {
      id: '1',
      name: 'Power of 2',
      description: 'Numbers that are powers of 2 always reach 1 in log₂(n) steps',
      example: '16 → 8 → 4 → 2 → 1',
      frequency: 0.1
    },
    {
      id: '2',
      name: 'Even-Odd Alternation',
      description: 'Many sequences alternate between even and odd numbers',
      example: '7 → 22 → 11 → 34 → 17',
      frequency: 0.3
    },
    {
      id: '3',
      name: 'Growth Pattern',
      description: 'Sequences often grow before reaching their peak',
      example: '27 → 82 → 41 → 124 → 62 → 31',
      frequency: 0.5
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setPatterns([]);

    // Simulate pattern analysis
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }

    setPatterns(mockPatterns);
    setIsAnalyzing(false);
  };

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 0.7) return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300';
    if (frequency >= 0.4) return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300';
    return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300';
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Pattern Analyzer</h3>
          <Badge variant="outline">
            {patterns.length} Patterns
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              type="number"
              min="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a number to analyze"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !input}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Analyzing patterns... {progress}%
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {patterns.map(pattern => (
            <Card key={pattern.id} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{pattern.name}</h4>
                  <Badge className={getFrequencyColor(pattern.frequency)}>
                    {Math.round(pattern.frequency * 100)}% Frequency
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {pattern.description}
                </p>
                <div className="text-sm font-mono bg-muted p-2 rounded">
                  {pattern.example}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
} 