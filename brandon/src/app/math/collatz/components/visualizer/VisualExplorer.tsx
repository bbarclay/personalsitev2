import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { HeatmapVisualizer } from './HeatmapVisualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { SpiralVisualizer } from './SpiralVisualizer';
import { NetworkVisualizer } from './NetworkVisualizer';
import { BubbleVisualizer } from './BubbleVisualizer';
import { TimelineVisualizer } from './TimelineVisualizer';
import { FractalVisualizer } from './FractalVisualizer';
import { HexGridVisualizer } from './HexGridVisualizer';
import { useCollatz } from '../../hooks/useCollatz';
import { PlayCircle, PauseCircle, SkipForward, Shuffle, RefreshCw } from 'lucide-react';

interface VisualExplorerProps {
  initialNumber?: number;
}

export function VisualExplorer({ initialNumber = 27 }: VisualExplorerProps) {
  const [viewType, setViewType] = useState<string>('heatmap');
  const [colorScheme, setColorScheme] = useState<'viridis' | 'plasma' | 'inferno' | 'magma'>('viridis');
  const [maxDepth, setMaxDepth] = useState(5);
  const [startNumber, setStartNumber] = useState(initialNumber.toString());
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(1000); // ms between numbers
  const [autoPlayDirection, setAutoPlayDirection] = useState<'increment' | 'random'>('increment');
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    sequence,
    steps,
    currentStep,
    error,
    calculateSequence,
    handleStepForward,
    handleStepBack,
    handleReset,
    handleRandom,
    statistics
  } = useCollatz(initialNumber);

  // Handle user input for start number
  const handleStartNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartNumber(e.target.value);
  };

  const handleStartNumberSubmit = () => {
    const num = parseInt(startNumber);
    if (!isNaN(num) && num > 0) {
      calculateSequence(num);
    }
  };

  const handleViewChange = (value: string) => {
    setViewType(value);
  };

  const handleColorSchemeChange = (value: string) => {
    setColorScheme(value as 'viridis' | 'plasma' | 'inferno' | 'magma');
  };

  const handleDepthChange = (value: string) => {
    setMaxDepth(Number(value));
  };

  // Auto-play functionality
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    
    autoPlayTimerRef.current = setInterval(() => {
      if (autoPlayDirection === 'increment') {
        const currentNum = parseInt(startNumber);
        const nextNum = currentNum + 1;
        setStartNumber(nextNum.toString());
        calculateSequence(nextNum);
      } else {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        setStartNumber(randomNum.toString());
        calculateSequence(randomNum);
      }
    }, autoPlaySpeed);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const handleAutoPlaySpeedChange = (value: number[]) => {
    setAutoPlaySpeed(value[0]);
    // Restart autoplay with new speed if currently playing
    if (isAutoPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  };

  const handleRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    setStartNumber(randomNum.toString());
    calculateSequence(randomNum);
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, []);

  const renderVisualization = () => {
    switch (viewType) {
      case 'heatmap':
        return (
          <HeatmapVisualizer
            data={sequence.map((value, index) => ({
              startNumber: parseInt(startNumber),
              steps: index + 1,
              maxValue: Math.max(...sequence.slice(0, index + 1)),
              convergenceRate: (index + 1) / steps
            }))}
            colorScheme={colorScheme}
          />
        );
      case 'tree':
        return (
          <TreeVisualizer
            data={{
              value: parseInt(startNumber),
              children: sequence.map((value, index) => ({
                value,
                children: [],
                depth: index,
                isEven: value % 2 === 0
              })),
              depth: 0,
              isEven: parseInt(startNumber) % 2 === 0
            }}
            maxDepth={maxDepth}
          />
        );
      case 'spiral':
        return (
          <SpiralVisualizer
            data={sequence.map((value, index) => ({
              value,
              angle: index,
              radius: Math.sqrt(value),
              isEven: value % 2 === 0
            }))}
            colorScheme={colorScheme}
          />
        );
      case 'network':
        return (
          <NetworkVisualizer
            data={sequence.map((value, index) => ({
              id: `${index}`,
              value,
              connections: index < sequence.length - 1 ? [`${index + 1}`] : [],
              isEven: value % 2 === 0
            }))}
            colorScheme={colorScheme}
          />
        );
      case 'bubble':
        return (
          <BubbleVisualizer
            data={sequence.map((value, index) => ({
              value,
              size: Math.log(value) * 5,
              step: index,
              isEven: value % 2 === 0
            }))}
            colorScheme={colorScheme}
          />
        );
      case 'timeline':
        return (
          <TimelineVisualizer
            data={sequence.map((value, index) => ({
              value,
              step: index,
              isEven: value % 2 === 0
            }))}
            colorScheme={colorScheme}
          />
        );
      case 'fractal':
        return (
          <FractalVisualizer
            data={sequence.map((value, index) => ({
              value,
              depth: index,
              isEven: value % 2 === 0
            }))}
            colorScheme={colorScheme}
          />
        );
      case 'hexgrid':
        return (
          <HexGridVisualizer
            data={sequence.map((value, index) => ({
              value,
              position: index,
              isEven: value % 2 === 0
            }))}
            colorScheme={colorScheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h4 className="text-md font-medium">Collatz Sequence Explorer</h4>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  value={startNumber}
                  onChange={handleStartNumberChange}
                  className="w-24 mr-2"
                  placeholder="Start #"
                />
                <Button onClick={handleStartNumberSubmit} size="sm">Go</Button>
              </div>
              
              <Button 
                onClick={handleRandomNumber} 
                size="sm" 
                variant="outline"
                className="flex items-center gap-1"
              >
                <Shuffle className="h-4 w-4" />
                Random
              </Button>
              
              <Button 
                onClick={toggleAutoPlay} 
                size="sm" 
                variant={isAutoPlaying ? "destructive" : "default"}
                className="flex items-center gap-1"
              >
                {isAutoPlaying ? (
                  <>
                    <PauseCircle className="h-4 w-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" />
                    Auto Play
                  </>
                )}
              </Button>
            </div>
          </div>

          {isAutoPlaying && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
                <Slider 
                  min={100} 
                  max={3000} 
                  step={100} 
                  value={[autoPlaySpeed]} 
                  onValueChange={handleAutoPlaySpeedChange}
                  defaultValue={[1000]}
                  className="w-full"
                />
              </div>
              
              <Select 
                value={autoPlayDirection} 
                onValueChange={(val: 'increment' | 'random') => setAutoPlayDirection(val)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increment">Increment</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Select value={viewType} onValueChange={handleViewChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heatmap">Heatmap</SelectItem>
                <SelectItem value="tree">Tree</SelectItem>
                <SelectItem value="spiral">Spiral</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="bubble">Bubble Chart</SelectItem>
                <SelectItem value="timeline">Timeline</SelectItem>
                <SelectItem value="fractal">Fractal</SelectItem>
                <SelectItem value="hexgrid">Hex Grid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={colorScheme} onValueChange={handleColorSchemeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viridis">Viridis</SelectItem>
                <SelectItem value="plasma">Plasma</SelectItem>
                <SelectItem value="inferno">Inferno</SelectItem>
                <SelectItem value="magma">Magma</SelectItem>
              </SelectContent>
            </Select>

            {viewType === 'tree' && (
              <Select value={maxDepth.toString()} onValueChange={handleDepthChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select max depth" />
                </SelectTrigger>
                <SelectContent>
                  {[3, 4, 5, 6, 7].map(depth => (
                    <SelectItem key={depth} value={depth.toString()}>
                      Depth {depth}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleStepBack}
              disabled={currentStep === 0}
              size="sm"
              variant="outline"
            >
              Previous Step
            </Button>
            <Button
              onClick={handleStepForward}
              disabled={currentStep === steps - 1}
              size="sm"
              variant="outline"
            >
              Next Step
            </Button>
            <Button
              onClick={handleReset}
              disabled={currentStep === 0}
              size="sm"
              variant="outline"
            >
              Reset
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </Card>

      {renderVisualization()}

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Sequence Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Step</p>
              <p className="text-lg font-medium">{currentStep + 1} / {steps}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-lg font-medium">{sequence[currentStep]}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Starting Number</p>
              <p className="text-lg font-medium">{startNumber}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Steps</p>
              <p className="text-lg font-medium">{steps}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 