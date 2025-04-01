import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCollatz } from '../../hooks/useCollatz';

interface ExperimentResult {
  id: string;
  title: string;
  date: string;
  data: {
    type: string;
    values: number[];
    labels?: string[];
  };
  summary: string;
}

export function ExperimentPanel() {
  const [experimentTitle, setExperimentTitle] = useState('');
  const [experimentType, setExperimentType] = useState('range');
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [customValues, setCustomValues] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ExperimentResult[]>([]);
  const [activeResult, setActiveResult] = useState<string | null>(null);
  const { calculateSequence } = useCollatz();

  const handleRunExperiment = async () => {
    if (!experimentTitle) return;

    setIsRunning(true);
    setProgress(0);

    const newResult: ExperimentResult = {
      id: Date.now().toString(),
      title: experimentTitle,
      date: new Date().toLocaleDateString(),
      data: {
        type: experimentType,
        values: [],
      },
      summary: ''
    };

    let values: number[] = [];
    let totalOperations = 100;

    if (experimentType === 'range' && startValue && endValue) {
      const start = parseInt(startValue);
      const end = parseInt(endValue);
      totalOperations = end - start + 1;
      
      for (let i = start; i <= end; i++) {
        const sequence = calculateSequence(i);
        values.push(sequence.length - 1); // Number of steps
        
        const currentProgress = Math.round(((i - start + 1) / totalOperations) * 100);
        setProgress(currentProgress);
        await new Promise(resolve => setTimeout(resolve, 5));
      }

      newResult.data.values = values;
      newResult.summary = `Analyzed Collatz sequences for numbers ${start} to ${end}. Average steps: ${(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)}`;
    } else if (experimentType === 'custom' && customValues) {
      const customNums = customValues.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      totalOperations = customNums.length;
      
      for (let i = 0; i < customNums.length; i++) {
        const sequence = calculateSequence(customNums[i]);
        values.push(sequence.length - 1); // Number of steps
        
        const currentProgress = Math.round(((i + 1) / totalOperations) * 100);
        setProgress(currentProgress);
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      newResult.data.values = values;
      newResult.data.labels = customNums.map(String);
      newResult.summary = `Analyzed Collatz sequences for custom values. Max steps: ${Math.max(...values)}, Min steps: ${Math.min(...values)}`;
    }

    setResults([newResult, ...results]);
    setIsRunning(false);
    resetForm();
  };

  const resetForm = () => {
    setExperimentTitle('');
    setStartValue('');
    setEndValue('');
    setCustomValues('');
  };

  const handleViewResult = (resultId: string) => {
    setActiveResult(resultId);
  };

  const handleDeleteResult = (resultId: string) => {
    setResults(results.filter(r => r.id !== resultId));
    if (activeResult === resultId) {
      setActiveResult(null);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Custom Experiments</h2>
          <Badge variant="outline">
            {results.length} Results
          </Badge>
        </div>

        {activeResult ? (
          <div className="space-y-4">
            {results.map(result => (
              result.id === activeResult && (
                <div key={result.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{result.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.date}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {result.data.type}
                    </Badge>
                  </div>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Summary</h4>
                        <p className="text-sm">{result.summary}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Results</h4>
                        <div className="bg-muted p-4 rounded h-[200px] overflow-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr>
                                <th className="text-left">Number</th>
                                <th className="text-left">Steps</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.data.values.map((value, index) => (
                                <tr key={index}>
                                  <td>{result.data.labels ? result.data.labels[index] : (parseInt(startValue) + index)}</td>
                                  <td>{value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveResult(null)}
                    >
                      Back to Experiments
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteResult(result.id)}
                    >
                      Delete Result
                    </Button>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <h3 className="font-medium">New Experiment</h3>

                <div className="space-y-2">
                  <Input
                    value={experimentTitle}
                    onChange={(e) => setExperimentTitle(e.target.value)}
                    placeholder="Experiment Title"
                  />
                </div>

                <div className="space-y-2">
                  <Select value={experimentType} onValueChange={setExperimentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experiment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="range">Range of Numbers</SelectItem>
                      <SelectItem value="custom">Custom Values</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {experimentType === 'range' ? (
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      min="1"
                      value={startValue}
                      onChange={(e) => setStartValue(e.target.value)}
                      placeholder="Start Value"
                    />
                    <Input
                      type="number"
                      min="1"
                      value={endValue}
                      onChange={(e) => setEndValue(e.target.value)}
                      placeholder="End Value"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      value={customValues}
                      onChange={(e) => setCustomValues(e.target.value)}
                      placeholder="Enter comma-separated values (e.g., 7, 13, 27, 31)"
                    />
                  </div>
                )}

                {isRunning && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Running experiment... {progress}%
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleRunExperiment}
                  disabled={isRunning || !experimentTitle || (experimentType === 'range' && (!startValue || !endValue)) || (experimentType === 'custom' && !customValues)}
                >
                  {isRunning ? 'Running...' : 'Run Experiment'}
                </Button>
              </div>
            </Card>

            <div className="space-y-2">
              <h3 className="font-medium">Previous Results</h3>
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map(result => (
                    <Card key={result.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{result.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {result.date}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleViewResult(result.id)}
                        >
                          View
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No experiments have been run yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
} 