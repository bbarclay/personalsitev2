import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, RotateCcw, Trash2, Clock } from 'lucide-react';

export interface MatrixHistoryEntry {
  id: string;
  timestamp: Date;
  description: string;
  matrix: string[][];
  vector: string[];
  size: number;
}

interface MatrixHistoryTrackerProps {
  history: MatrixHistoryEntry[];
  onSelectEntry: (entry: MatrixHistoryEntry) => void;
  onClearHistory: () => void;
  maxDisplayEntries?: number;
  className?: string;
}

export const MatrixHistoryTracker: React.FC<MatrixHistoryTrackerProps> = ({
  history,
  onSelectEntry,
  onClearHistory,
  maxDisplayEntries = 5,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (history.length === 0) {
    return null;
  }
  
  // Format date to a readable string
  const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get a preview of the matrix for display
  const getMatrixPreview = (matrix: string[][], size: number): string => {
    if (size <= 2) {
      // For small matrices, show the full matrix
      return matrix.map(row => `[${row.join(', ')}]`).join(', ');
    } else {
      // For larger matrices, show dimensions
      return `${size}×${size} matrix`;
    }
  };
  
  // Display a limited number of entries unless expanded
  const displayEntries = isExpanded 
    ? history 
    : history.slice(0, maxDisplayEntries);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center">
            <History className="h-5 w-5 text-blue-500 mr-2" />
            Matrix History
            <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="h-8 text-gray-500"
            title="Clear History"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`pr-3 ${isExpanded ? 'max-h-[300px]' : ''}`}>
          <div className="space-y-2">
            {displayEntries.map((entry, index) => (
              <div 
                key={entry.id}
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  index === 0 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => onSelectEntry(entry)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-sm truncate">
                      {entry.description || `Matrix ${history.length - index}`}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1 inline" />
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEntry(entry);
                    }}
                    title="Restore this matrix"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="mt-2 text-xs font-mono text-gray-600 dark:text-gray-400 truncate">
                  {getMatrixPreview(entry.matrix, entry.size)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {history.length > maxDisplayEntries && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-3 text-sm text-gray-500"
          >
            {isExpanded ? 'Show Less' : `Show ${history.length - maxDisplayEntries} More`}
          </Button>
        )}
        
        {history.length === 0 && (
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            No matrix history yet. Solve systems to track your work.
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 