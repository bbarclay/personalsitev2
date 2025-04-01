import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowRightLeft, ArrowDown, Scale, ChevronRight, ArrowUpDown } from 'lucide-react';

interface MatrixStep {
  matrix: number[][];
  vector?: number[];
  explanation: string;
  highlight?: { 
    type: 'row' | 'col' | 'element'; 
    index: number | [number, number]; 
  };
}

interface StepComparisonViewProps {
  beforeStep: MatrixStep;
  afterStep: MatrixStep;
  className?: string;
  showDifferences?: boolean;
  showAugmented?: boolean;
  title?: string;
}

export const StepComparisonView: React.FC<StepComparisonViewProps> = ({
  beforeStep,
  afterStep,
  className = '',
  showDifferences = true,
  showAugmented = true,
  title = 'Step Comparison',
}) => {
  // Determine operation type (swap, scale, add) from explanation text
  const getOperationType = (explanation: string): 'swap' | 'scale' | 'add' | 'unknown' => {
    const lowerExplanation = explanation.toLowerCase();
    
    if (lowerExplanation.includes('swap') || lowerExplanation.includes('interchange')) {
      return 'swap';
    } else if (lowerExplanation.includes('scale') || lowerExplanation.includes('multiply')) {
      return 'scale';
    } else if (lowerExplanation.includes('add') || lowerExplanation.includes('subtract')) {
      return 'add';
    }
    
    return 'unknown';
  };
  
  const operationType = getOperationType(afterStep.explanation);
  
  // Get operation icon based on type
  const getOperationIcon = () => {
    switch (operationType) {
      case 'swap':
        return <ArrowUpDown className="h-5 w-5 text-amber-500" />;
      case 'scale':
        return <Scale className="h-5 w-5 text-blue-500" />;
      case 'add':
        return <ArrowRightLeft className="h-5 w-5 text-green-500" />;
      default:
        return <ChevronRight className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Badge color based on operation type
  const getBadgeVariant = () => {
    switch (operationType) {
      case 'swap':
        return 'warning';
      case 'scale':
        return 'info';
      case 'add':
        return 'success';
      default:
        return 'secondary';
    }
  };

  // Calculate cell differences for highlighting
  const getCellDifferences = (): Array<[number, number]> => {
    if (!showDifferences) return [];
    
    const differences: Array<[number, number]> = [];
    const beforeMat = beforeStep.matrix;
    const afterMat = afterStep.matrix;
    
    if (!beforeMat || !afterMat) return [];
    
    const rows = Math.min(beforeMat.length, afterMat.length);
    
    for (let i = 0; i < rows; i++) {
      const beforeRow = beforeMat[i] || [];
      const afterRow = afterMat[i] || [];
      const cols = Math.min(beforeRow.length, afterRow.length);
      
      for (let j = 0; j < cols; j++) {
        if (Math.abs(beforeRow[j] - afterRow[j]) > 1e-10) {
          differences.push([i, j]);
        }
      }
    }
    
    return differences;
  };
  
  // Calculate vector differences for highlighting
  const getVectorDifferences = (): Array<number> => {
    if (!showDifferences || !showAugmented) return [];
    
    const differences: Array<number> = [];
    const beforeVec = beforeStep.vector;
    const afterVec = afterStep.vector;
    
    if (!beforeVec || !afterVec) return [];
    
    const length = Math.min(beforeVec.length, afterVec.length);
    
    for (let i = 0; i < length; i++) {
      if (Math.abs(beforeVec[i] - afterVec[i]) > 1e-10) {
        differences.push(i);
      }
    }
    
    return differences;
  };
  
  const cellDiffs = getCellDifferences();
  const vectorDiffs = getVectorDifferences();
  
  // Check if a cell should be highlighted
  const shouldHighlightCell = (row: number, col: number): boolean => {
    // Check explicit highlight from step
    const highlight = afterStep.highlight;
    if (highlight) {
      if (highlight.type === 'row' && highlight.index === row) {
        return true;
      } else if (highlight.type === 'col' && highlight.index === col) {
        return true;
      } else if (highlight.type === 'element' && Array.isArray(highlight.index)) {
        const [highlightRow, highlightCol] = highlight.index;
        return highlightRow === row && highlightCol === col;
      }
    }
    
    // Check calculated differences
    return cellDiffs.some(([r, c]) => r === row && c === col);
  };
  
  // Check if a vector element should be highlighted
  const shouldHighlightVector = (index: number): boolean => {
    return vectorDiffs.includes(index);
  };
  
  // Format cell value for display
  const formatValue = (value: number): string => {
    if (Math.abs(value) < 1e-10) return '0';
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(2);
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center">
            {getOperationIcon()}
            <span className="ml-2">{title}</span>
          </CardTitle>
          <Badge variant={getBadgeVariant()}>
            {operationType.charAt(0).toUpperCase() + operationType.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-4">{afterStep.explanation}</div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Before step */}
          <div className="w-full">
            <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Before:</div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-3 overflow-auto">
              <table className="min-w-full border-collapse">
                <tbody>
                  {beforeStep.matrix.map((row, rowIndex) => (
                    <tr key={`before-row-${rowIndex}`}>
                      {row.map((cell, colIndex) => (
                        <td 
                          key={`before-cell-${rowIndex}-${colIndex}`}
                          className={`p-1.5 text-center font-mono text-sm border border-gray-200 dark:border-gray-800`}
                        >
                          {formatValue(cell)}
                        </td>
                      ))}
                      {showAugmented && beforeStep.vector && (
                        <td 
                          key={`before-vec-${rowIndex}`}
                          className="p-1.5 text-center font-mono text-sm border border-gray-200 dark:border-gray-800 border-l-2"
                        >
                          {formatValue(beforeStep.vector[rowIndex])}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="hidden sm:flex">
            <ArrowRight className="h-6 w-6 text-gray-400" />
          </div>
          
          <div className="flex sm:hidden">
            <ArrowDown className="h-6 w-6 text-gray-400" />
          </div>
          
          {/* After step */}
          <div className="w-full">
            <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">After:</div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-3 overflow-auto">
              <table className="min-w-full border-collapse">
                <tbody>
                  {afterStep.matrix.map((row, rowIndex) => (
                    <tr key={`after-row-${rowIndex}`}>
                      {row.map((cell, colIndex) => (
                        <td 
                          key={`after-cell-${rowIndex}-${colIndex}`}
                          className={`p-1.5 text-center font-mono text-sm border border-gray-200 dark:border-gray-800 ${
                            shouldHighlightCell(rowIndex, colIndex) 
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 font-bold'
                              : ''
                          }`}
                        >
                          {formatValue(cell)}
                        </td>
                      ))}
                      {showAugmented && afterStep.vector && (
                        <td 
                          key={`after-vec-${rowIndex}`}
                          className={`p-1.5 text-center font-mono text-sm border border-gray-200 dark:border-gray-800 border-l-2 ${
                            shouldHighlightVector(rowIndex)
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 font-bold'
                              : ''
                          }`}
                        >
                          {formatValue(afterStep.vector[rowIndex])}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 