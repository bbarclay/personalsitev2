'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, Minus, ChevronDown, ChevronRight, 
  HelpCircle, AlertCircle, CheckCircle, Trash2, Copy
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export interface EquationEditorProps {
  equations: string[];
  onChange: (equations: string[]) => void;
  maxEquations?: number;
  minEquations?: number;
  showValidation?: boolean;
}

export function EquationEditor({
  equations,
  onChange,
  maxEquations = 10,
  minEquations = 1,
  showValidation = true,
}: EquationEditorProps) {
  const [expanded, setExpanded] = useState(true);
  const [validationStatus, setValidationStatus] = useState<
    Array<{ valid: boolean; message?: string }>
  >([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const latestInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    validateEquations();
  }, [equations]);

  // Focus the latest input when adding a new equation
  useEffect(() => {
    if (latestInputRef.current) {
      latestInputRef.current.focus();
    }
  }, [equations.length]);

  // Add keyboard handling for equation operations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter to add new equation
      if (e.ctrlKey && e.key === 'Enter') {
        addEquation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [equations]);

  const validateEquations = () => {
    const newValidationStatus = equations.map(validateEquation);
    setValidationStatus(newValidationStatus);
    
    // Collect all errors
    const errorMessages = newValidationStatus
      .filter(status => !status.valid)
      .map(status => status.message)
      .filter(Boolean) as string[];
    
    setErrors([...new Set(errorMessages)]); // Remove duplicates
  };

  const validateEquation = (equation: string): { valid: boolean; message?: string } => {
    // Empty equations are invalid
    if (!equation.trim()) {
      return { valid: false, message: 'Equation cannot be empty' };
    }

    // Check if it contains an equals sign
    if (!equation.includes('=')) {
      return { valid: false, message: 'Equation must contain an equals sign (=)' };
    }

    // Regular expression to match valid linear equation format
    // Supports formats like:
    // 2x + 3y = 5
    // -x + 2y - z = 0
    // x - y = 7
    const linearEquationRegex = /^(\s*[-+]?\s*\d*\.?\d*\s*[a-zA-Z]\s*)+\s*=\s*[-+]?\s*\d+\.?\d*\s*$/;

    if (!linearEquationRegex.test(equation)) {
      return { 
        valid: false, 
        message: 'Invalid format. Use format like "2x + 3y = 5"' 
      };
    }

    return { valid: true };
  };

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...equations];
    newEquations[index] = value;
    onChange(newEquations);
  };

  const addEquation = () => {
    if (equations.length < maxEquations) {
      onChange([...equations, '']);
    }
  };

  const removeEquation = (index: number) => {
    if (equations.length > minEquations) {
      const newEquations = [...equations];
      newEquations.splice(index, 1);
      onChange(newEquations);
    }
  };

  const clearAllEquations = () => {
    onChange(Array(minEquations).fill(''));
  };

  const copyEquations = () => {
    const text = equations.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: "Equations copied to clipboard",
        duration: 2000,
      });
    });
  };

  const getSystemSize = () => {
    // Check if all equations have the same variables
    const variables = new Set<string>();
    let consistentVariables = true;
    
    equations.forEach(eq => {
      // Extract all variables from the equation
      const eqVariables = new Set<string>();
      const parts = eq.split('=')[0]; // Only consider left side
      if (parts) {
        // Match all variables (single letters)
        const matches = parts.match(/[a-zA-Z]/g);
        if (matches) {
          matches.forEach(v => eqVariables.add(v));
        }
      }
      
      // Check if this is the first equation or if variables match
      if (variables.size === 0) {
        // First equation, set the variables
        eqVariables.forEach(v => variables.add(v));
      } else if (eqVariables.size !== variables.size) {
        // Different number of variables
        consistentVariables = false;
      } else {
        // Check if the variables are the same
        for (const v of eqVariables) {
          if (!variables.has(v)) {
            consistentVariables = false;
            break;
          }
        }
      }
    });
    
    const numEquations = equations.length;
    const numVariables = variables.size;
    
    if (!consistentVariables) {
      return `${numEquations} × ? (inconsistent variables)`;
    }
    
    return `${numEquations} × ${numVariables}`;
  };

  const getSystemSizeClass = () => {
    const validEquations = validationStatus.filter(s => s.valid).length;
    if (validEquations !== equations.length) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
    
    const [numEquations, numVariables] = getSystemSize().split('×').map(s => parseInt(s.trim()));
    
    if (isNaN(numVariables)) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
    
    if (numEquations === numVariables) {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    
    if (numEquations > numVariables) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    
    return 'bg-orange-100 text-orange-800 border-orange-300';
  };

  const getSystemStatus = () => {
    const validEquations = validationStatus.filter(s => s.valid).length;
    if (validEquations !== equations.length) {
      return {
        message: 'Fix equation format issues',
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
        color: 'text-yellow-600'
      };
    }
    
    const [numEquations, numVariables] = getSystemSize().split('×').map(s => parseInt(s.trim()));
    
    if (isNaN(numVariables)) {
      return {
        message: 'Inconsistent variables across equations',
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
        color: 'text-yellow-600'
      };
    }
    
    if (numEquations === numVariables) {
      return {
        message: 'Likely has a unique solution',
        icon: <CheckCircle className="h-4 w-4 mr-1" />,
        color: 'text-green-600'
      };
    }
    
    if (numEquations > numVariables) {
      return {
        message: 'Overdetermined (may be inconsistent)',
        icon: <HelpCircle className="h-4 w-4 mr-1" />,
        color: 'text-blue-600'
      };
    }
    
    return {
      message: 'Underdetermined (may have infinite solutions)',
      icon: <HelpCircle className="h-4 w-4 mr-1" />,
      color: 'text-orange-600'
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {expanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          )}
          <h3 className="font-medium text-gray-900 dark:text-white">System of Equations</h3>
          <Badge 
            variant="outline"
            className={cn("ml-3 font-normal", getSystemSizeClass())}
          >
            {getSystemSize()}
          </Badge>
        </div>
        <div className="flex items-center">
          <span className={cn("text-sm flex items-center mr-2", getSystemStatus().color)}>
            {getSystemStatus().icon}
            {getSystemStatus().message}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <div className="space-y-2">
                  <p className="font-medium">Equation Format</p>
                  <p className="text-sm">Valid examples:</p>
                  <ul className="text-sm list-disc list-inside">
                    <li>2x + 3y = 5</li>
                    <li>-x + 4y - 2z = 0</li>
                    <li>x - y = 7</li>
                  </ul>
                  <p className="text-sm font-medium mt-2">Keyboard Shortcuts:</p>
                  <ul className="text-sm list-disc list-inside">
                    <li>Ctrl + Enter: Add new equation</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="space-y-3">
            {/* Equation inputs */}
            {equations.map((equation, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition-colors",
                  hoveredRow === index ? "bg-gray-50 dark:bg-gray-900" : ""
                )}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                  {`Eq ${index + 1}:`}
                </span>
                <div className="relative flex-1">
                  <Input
                    ref={index === equations.length - 1 ? latestInputRef : null}
                    value={equation}
                    onChange={(e) => handleEquationChange(index, e.target.value)}
                    placeholder="Example: 2x + 3y = 5"
                    className={cn(
                      "pr-9",
                      showValidation && validationStatus[index] && !validationStatus[index].valid
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "",
                      showValidation && validationStatus[index]?.valid
                        ? "border-green-300 focus:ring-green-500 focus:border-green-500"
                        : ""
                    )}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        addEquation();
                      }
                    }}
                  />
                  {showValidation && validationStatus[index] && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {validationStatus[index].valid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-default">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              {validationStatus[index].message || 'Invalid format'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => removeEquation(index)}
                  disabled={equations.length <= minEquations}
                  aria-label="Remove equation"
                >
                  <Minus className={cn(
                    "h-4 w-4", 
                    equations.length <= minEquations ? "text-gray-300" : "text-current"
                  )} />
                </Button>
              </div>
            ))}
            
            {/* Actions */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={addEquation}
                  disabled={equations.length >= maxEquations}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Equation
                </Button>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyEquations}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy all equations</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllEquations}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear all equations</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {errors.length > 0 && (
                <div className="flex-1 ml-4">
                  <div className="bg-red-50 border border-red-200 rounded-md p-2">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Please fix the following issues:</p>
                        <ul className="mt-1 text-xs text-red-700 list-disc list-inside">
                          {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 