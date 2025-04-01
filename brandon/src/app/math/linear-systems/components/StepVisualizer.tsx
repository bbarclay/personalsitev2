'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  ChevronRight, ChevronLeft, ZoomIn, ZoomOut,
  Maximize2, Minimize2, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

export type SolutionStep = {
  description: string;
  equations: string[];
  matrix?: number[][];
  pivot?: [number, number];
  highlightRows?: number[];
  highlightCols?: number[];
  operation?: string;
};

type Variable = 'x' | 'y' | 'z' | 'w';
export type Solution = Record<Variable, number> | 'inconsistent' | 'infinite' | null;

interface StepVisualizerProps {
  steps: SolutionStep[];
  solution: Solution;
  onStepChange?: (step: number) => void;
  className?: string;
}

export function StepVisualizer({ 
  steps, 
  solution,
  onStepChange,
  className
}: StepVisualizerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tooltipEnabled, setTooltipEnabled] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentStep = steps[currentStepIndex];
  const previousStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : undefined;
  
  // Set canvas size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      const container = containerRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match container size
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Redraw the current step
      drawStep();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space: play/pause
      if (e.code === 'Space') {
        setIsPlaying(prev => !prev);
        e.preventDefault();
      }
      // Left arrow: previous step
      else if (e.code === 'ArrowLeft') {
        goToPreviousStep();
        e.preventDefault();
      }
      // Right arrow: next step
      else if (e.code === 'ArrowRight') {
        nextStep();
        e.preventDefault();
      }
      // Home: restart
      else if (e.code === 'Home') {
        restart();
        e.preventDefault();
      }
      // End: go to end
      else if (e.code === 'End') {
        goToStep(steps.length - 1);
        e.preventDefault();
      }
      // +: zoom in
      else if (e.code === 'Equal' || e.code === 'NumpadAdd') {
        zoomIn();
        e.preventDefault();
      }
      // -: zoom out
      else if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
        zoomOut();
        e.preventDefault();
      }
      // F: fullscreen
      else if (e.code === 'KeyF') {
        toggleFullscreen();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStepIndex, steps.length]);
  
  // Handle step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStepIndex);
    }
    
    // Draw the current step
    drawStep();
    
    // If playing, schedule the next step
    if (isPlaying && currentStepIndex < steps.length - 1) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
      }, 2000 / playbackSpeed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStepIndex, isPlaying, playbackSpeed, steps.length, onStepChange]);
  
  // Handle playback state changes
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else if (currentStepIndex < steps.length - 1) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
      }, 2000 / playbackSpeed);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, currentStepIndex, steps.length]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const playPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const goToStep = (index: number) => {
    setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };
  
  const nextStep = () => {
    goToStep(currentStepIndex + 1);
  };
  
  const goToPreviousStep = () => {
    goToStep(currentStepIndex - 1);
  };
  
  const restart = () => {
    goToStep(0);
    setIsPlaying(false);
  };
  
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };
  
  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const toggleFullscreen = () => {
    if (!fullscreenRef.current) return;
    
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleTooltips = () => {
    setTooltipEnabled(prev => !prev);
  };
  
  const drawStep = useCallback(() => {
    if (!canvasRef.current || !currentStep?.matrix) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get matrix dimensions
    const matrix = currentStep.matrix;
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Calculate cell size and position
    const padding = 50;
    const availableWidth = canvas.width - padding * 2;
    const availableHeight = canvas.height - padding * 2;
    
    // Determine if we should scale based on width or height
    const cellSizeByWidth = availableWidth / cols;
    const cellSizeByHeight = availableHeight / rows;
    let cellSize = Math.min(cellSizeByWidth, cellSizeByHeight) * zoom;
    
    // Ensure cell size is at least 30px but not more than 100px
    cellSize = Math.max(30, Math.min(cellSize, 100));
    
    // Calculate grid dimensions
    const gridWidth = cellSize * cols;
    const gridHeight = cellSize * rows;
    
    // Center the grid
    const startX = (canvas.width - gridWidth) / 2;
    const startY = (canvas.height - gridHeight) / 2;
    
    // Draw cells and values
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = startX + j * cellSize;
        const y = startY + i * cellSize;
        
        // Set cell background color based on properties
        let backgroundColor = '#ffffff';
        let opacity = 1;
        let borderColor = '#e5e7eb';
        let borderWidth = 1;
        
        if (currentStep.pivot && currentStep.pivot[0] === i && currentStep.pivot[1] === j) {
          // Pivot element
          backgroundColor = '#fef3c7';
          borderColor = '#f59e0b';
          borderWidth = 2;
        } else if (currentStep.highlightRows?.includes(i)) {
          // Highlighted row
          backgroundColor = '#e0f2fe';
          borderColor = '#0ea5e9';
        } else if (currentStep.highlightCols?.includes(j)) {
          // Highlighted column
          backgroundColor = '#dcfce7';
          borderColor = '#10b981';
        }
        
        // Separate color for the constants column
        if (j === cols - 1) {
          backgroundColor = '#f9fafb';
          if (currentStep.highlightRows?.includes(i) || 
             (currentStep.pivot && currentStep.pivot[0] === i)) {
            backgroundColor = '#f1f5f9';
          }
        }
        
        // Draw cell background
        ctx.fillStyle = backgroundColor;
        ctx.globalAlpha = opacity;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.globalAlpha = 1;
        
        // Draw cell border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(x, y, cellSize, cellSize);
        
        // Draw vertical separator before the last column (constants)
        if (j === cols - 2) {
          ctx.beginPath();
          ctx.moveTo(x + cellSize, y);
          ctx.lineTo(x + cellSize, y + cellSize);
          ctx.strokeStyle = '#9ca3af';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Draw value
        const value = matrix[i][j];
        let valueText = value.toFixed(2);
        
        // Format to remove trailing zeros
        if (value === Math.floor(value)) {
          valueText = value.toString();
        } else if (value * 10 === Math.floor(value * 10)) {
          valueText = value.toFixed(1);
        }
        
        // Handle -0.00 display
        if (valueText === '-0.00' || valueText === '-0.0' || valueText === '-0') {
          valueText = '0';
        }
        
        ctx.fillStyle = '#374151';
        ctx.font = `${Math.max(14, cellSize / 3)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(valueText, x + cellSize / 2, y + cellSize / 2);
      }
    }
    
    // Draw row labels
    for (let i = 0; i < rows; i++) {
      const y = startY + i * cellSize + cellSize / 2;
      
      ctx.fillStyle = '#6b7280';
      ctx.font = `${Math.max(12, cellSize / 4)}px Arial`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`R${i + 1}`, startX - 10, y);
    }
    
    // Draw column labels
    const variables = ['x', 'y', 'z', 'w'].slice(0, cols - 1);
    for (let j = 0; j < cols; j++) {
      const x = startX + j * cellSize + cellSize / 2;
      
      ctx.fillStyle = '#6b7280';
      ctx.font = `${Math.max(12, cellSize / 4)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      
      if (j === cols - 1) {
        ctx.fillText('=', x, startY - 5);
      } else {
        ctx.fillText(variables[j], x, startY - 5);
      }
    }
    
    // Draw operation description
    if (currentStep.operation) {
      ctx.fillStyle = '#1e40af';
      ctx.font = `bold ${Math.max(16, cellSize / 3)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(currentStep.operation, canvas.width / 2, startY - 30);
    }
    
    // Draw step description
    ctx.fillStyle = '#4b5563';
    ctx.font = `${Math.max(14, cellSize / 3.5)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(currentStep.description, canvas.width / 2, startY + gridHeight + 20);

    // Add a legend
    const legendX = startX;
    const legendY = startY + gridHeight + 50;
    const legendWidth = 160;
    const legendHeight = 20;
    const legendSpacing = 25;

    // Draw pivot legend
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX, legendY, legendWidth, legendHeight);
    
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Pivot Element', legendX + legendWidth + 10, legendY + legendHeight / 2);

    // Draw row highlight legend
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(legendX, legendY + legendSpacing, legendWidth, legendHeight);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 1;
    ctx.strokeRect(legendX, legendY + legendSpacing, legendWidth, legendHeight);
    
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Highlighted Row', legendX + legendWidth + 10, legendY + legendSpacing + legendHeight / 2);

    // Draw column highlight legend
    ctx.fillStyle = '#dcfce7';
    ctx.fillRect(legendX, legendY + 2 * legendSpacing, legendWidth, legendHeight);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1;
    ctx.strokeRect(legendX, legendY + 2 * legendSpacing, legendWidth, legendHeight);
    
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Highlighted Column', legendX + legendWidth + 10, legendY + 2 * legendSpacing + legendHeight / 2);
  }, [currentStep, zoom]);
  
  // Update first useEffect to include drawStep
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      const container = containerRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match container size
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Redraw the current step
      drawStep();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawStep]);
  
  return (
    <div 
      ref={fullscreenRef}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
    >
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white">Solution Steps</h3>
        
        <div className="flex items-center space-x-2">
          <HoverCard open={tooltipEnabled}>
            <HoverCardTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={toggleTooltips}
              >
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">Keyboard Controls</h4>
                <div className="grid grid-cols-2 gap-y-1">
                  <div className="text-sm text-gray-500">Space</div>
                  <div className="text-sm">Play/Pause</div>
                  <div className="text-sm text-gray-500">Left/Right Arrow</div>
                  <div className="text-sm">Previous/Next Step</div>
                  <div className="text-sm text-gray-500">Home/End</div>
                  <div className="text-sm">First/Last Step</div>
                  <div className="text-sm text-gray-500">+/-</div>
                  <div className="text-sm">Zoom In/Out</div>
                  <div className="text-sm text-gray-500">F</div>
                  <div className="text-sm">Toggle Fullscreen</div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-gray-500" />
            ) : (
              <Maximize2 className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Step progress */}
        <div className="mb-4 flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 w-16">
            Step {currentStepIndex + 1}/{steps.length}
          </span>
          <div className="flex-1">
            <Slider
              value={[currentStepIndex + 1]}
              min={1}
              max={steps.length}
              step={1}
              onValueChange={(value) => goToStep(value[0] - 1)}
              aria-label="Step Progress"
            />
          </div>
        </div>
        
        {/* Visualization container */}
        <div 
          ref={containerRef}
          className="relative bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4"
          style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '400px' }}
        >
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
          
          {/* Zoom controls */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-white/80 dark:bg-gray-800/80 border-gray-200"
                    onClick={zoomIn}
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Zoom In (+)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-white/80 dark:bg-gray-800/80 border-gray-200"
                    onClick={zoomOut}
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Zoom Out (-)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Playback controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={restart}
                    disabled={currentStepIndex === 0}
                    aria-label="Go to First Step"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>First Step (Home)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={goToPreviousStep}
                    disabled={currentStepIndex === 0}
                    aria-label="Previous Step"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Step (←)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="primary" 
                    size="icon" 
                    className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={playPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Play/Pause (Space)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={nextStep}
                    disabled={currentStepIndex === steps.length - 1}
                    aria-label="Next Step"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Step (→)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={() => goToStep(steps.length - 1)}
                    disabled={currentStepIndex === steps.length - 1}
                    aria-label="Go to Last Step"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Last Step (End)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Speed:</span>
            <div className="flex space-x-1">
              {[0.5, 1, 1.5, 2].map((speed) => (
                <Badge
                  key={speed}
                  variant={playbackSpeed === speed ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPlaybackSpeed(speed)}
                >
                  {speed}x
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 