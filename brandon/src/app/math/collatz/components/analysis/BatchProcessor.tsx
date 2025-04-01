import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useCollatz } from '../../hooks/useCollatz';

interface BatchStats {
  totalNumbers: number;
  processedNumbers: number;
  maxSteps: number;
  maxValue: number;
  averageSteps: number;
  evenCount: number;
  oddCount: number;
}

export function BatchProcessor() {
  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<BatchStats | null>(null);
  const { calculateSequence } = useCollatz();

  const handleProcess = async () => {
    if (!startNumber || !endNumber) return;

    const start = parseInt(startNumber);
    const end = parseInt(endNumber);
    if (start > end || start < 1) return;

    setIsProcessing(true);
    setProgress(0);
    setStats(null);

    const totalNumbers = end - start + 1;
    let processedNumbers = 0;
    let maxSteps = 0;
    let maxValue = 0;
    let totalSteps = 0;
    let evenCount = 0;
    let oddCount = 0;

    for (let i = start; i <= end; i++) {
      const sequence = calculateSequence(i);
      processedNumbers++;
      
      maxSteps = Math.max(maxSteps, sequence.length - 1);
      maxValue = Math.max(maxValue, ...sequence);
      totalSteps += sequence.length - 1;
      
      // Count even/odd numbers in sequence
      sequence.forEach(num => {
        if (num % 2 === 0) evenCount++;
        else oddCount++;
      });

      // Update progress
      const currentProgress = Math.round((processedNumbers / totalNumbers) * 100);
      setProgress(currentProgress);
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    setStats({
      totalNumbers,
      processedNumbers,
      maxSteps,
      maxValue,
      averageSteps: totalSteps / totalNumbers,
      evenCount,
      oddCount
    });

    setIsProcessing(false);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Batch Processor</h3>
          <Badge variant="outline">
            {stats ? `${stats.processedNumbers} Numbers` : 'Ready'}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              type="number"
              min="1"
              value={startNumber}
              onChange={(e) => setStartNumber(e.target.value)}
              placeholder="Start number"
            />
            <Input
              type="number"
              min="1"
              value={endNumber}
              onChange={(e) => setEndNumber(e.target.value)}
              placeholder="End number"
            />
            <Button
              onClick={handleProcess}
              disabled={isProcessing || !startNumber || !endNumber}
            >
              {isProcessing ? 'Processing...' : 'Process'}
            </Button>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Processing sequences... {progress}%
              </p>
            </div>
          )}
        </div>

        {stats && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Sequence Statistics</h4>
                <div className="space-y-1 text-sm">
                  <p>Max Steps: {stats.maxSteps}</p>
                  <p>Max Value: {stats.maxValue}</p>
                  <p>Average Steps: {stats.averageSteps.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Number Distribution</h4>
                <div className="space-y-1 text-sm">
                  <p>Even Numbers: {stats.evenCount}</p>
                  <p>Odd Numbers: {stats.oddCount}</p>
                  <p>Even/Odd Ratio: {(stats.evenCount / stats.oddCount).toFixed(2)}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
} 