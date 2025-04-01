import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'interactive' | 'quiz';
  completed: boolean;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: TutorialStep[];
}

export function TutorialPanel() {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  // Mock data - replace with actual tutorials
  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Getting Started with Collatz',
      description: 'Learn the basics of the Collatz Conjecture and how to generate sequences.',
      difficulty: 'beginner',
      steps: [
        {
          id: '1-1',
          title: 'What is the Collatz Conjecture?',
          content: 'The Collatz Conjecture is a mathematical problem that involves a sequence of numbers. For any positive integer n, the sequence is defined as follows:\n\n- If n is even, divide it by 2\n- If n is odd, multiply it by 3 and add 1 (3n + 1)\n\nThe conjecture states that this sequence will always reach 1, regardless of the starting number.',
          type: 'text',
          completed: false
        },
        {
          id: '1-2',
          title: 'Try it Yourself',
          content: 'Enter a positive number to see its Collatz sequence:',
          type: 'interactive',
          completed: false
        },
        {
          id: '1-3',
          title: 'Quick Quiz',
          content: 'What happens when you start with the number 6?',
          type: 'quiz',
          completed: false
        }
      ]
    },
    {
      id: '2',
      title: 'Patterns and Properties',
      description: 'Explore the patterns and mathematical properties of Collatz sequences.',
      difficulty: 'intermediate',
      steps: [
        {
          id: '2-1',
          title: 'Common Patterns',
          content: 'Many Collatz sequences share similar patterns. For example, sequences often follow a "rise and fall" pattern, where numbers increase before eventually decreasing to 1.',
          type: 'text',
          completed: false
        },
        {
          id: '2-2',
          title: 'Sequence Length',
          content: 'The number of steps it takes to reach 1 varies greatly. Some numbers reach 1 quickly, while others take many steps.',
          type: 'text',
          completed: false
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: Tutorial['difficulty']) => {
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

  const handleStartTutorial = (tutorialId: string) => {
    setActiveTutorial(tutorialId);
    setCurrentStep(0);
    setUserAnswer('');
  };

  const handleNextStep = () => {
    if (activeTutorial) {
      const tutorial = tutorials.find(t => t.id === activeTutorial);
      if (tutorial && currentStep < tutorial.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setUserAnswer('');
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setUserAnswer('');
    }
  };

  const handleCompleteTutorial = () => {
    if (activeTutorial) {
      const tutorial = tutorials.find(t => t.id === activeTutorial);
      if (tutorial) {
        tutorial.steps[currentStep].completed = true;
        if (currentStep === tutorial.steps.length - 1) {
          setActiveTutorial(null);
          setCurrentStep(0);
        } else {
          handleNextStep();
        }
      }
    }
  };

  const renderStepContent = (step: TutorialStep) => {
    switch (step.type) {
      case 'interactive':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{step.content}</p>
            <div className="flex space-x-2">
              <Input
                type="number"
                min="1"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter a number"
              />
              <Button onClick={handleCompleteTutorial}>Try</Button>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{step.content}</p>
            <div className="flex space-x-2">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
              <Button onClick={handleCompleteTutorial}>Submit</Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {step.content}
            </p>
            <Button onClick={handleCompleteTutorial}>Continue</Button>
          </div>
        );
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Interactive Tutorials</h2>
          <Badge variant="outline">
            {tutorials.length} Tutorials
          </Badge>
        </div>

        {activeTutorial ? (
          <div className="space-y-4">
            {tutorials.map(tutorial => (
              tutorial.id === activeTutorial && (
                <div key={tutorial.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tutorial.description}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                  </div>

                  <Progress
                    value={(currentStep / tutorial.steps.length) * 100}
                    className="h-2"
                  />

                  <div className="space-y-4">
                    {tutorial.steps.map((step, index) => (
                      index === currentStep && (
                        <Card key={step.id} className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{step.title}</h4>
                              <Badge variant="outline">
                                Step {index + 1} of {tutorial.steps.length}
                              </Badge>
                            </div>
                            {renderStepContent(step)}
                          </div>
                        </Card>
                      )
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTutorial(null)}
                    >
                      Exit Tutorial
                    </Button>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {tutorials.map(tutorial => (
                <Card key={tutorial.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tutorial.description}
                        </p>
                      </div>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {tutorial.steps.length} Steps
                        </Badge>
                        <Badge variant="outline">
                          {tutorial.steps.filter(s => s.completed).length} Completed
                        </Badge>
                      </div>
                      <Button onClick={() => handleStartTutorial(tutorial.id)}>
                        Start Tutorial
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
} 