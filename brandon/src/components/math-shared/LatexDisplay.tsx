import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface LatexDisplayProps {
  type: 'matrix' | 'augmented' | 'vector' | 'system' | 'equation';
  data: {
    matrix?: number[][] | string[][];
    vector?: number[] | string[];
    solution?: number[];
    variableNames?: string[]; // Default to x_1, x_2, etc.
  };
  title?: string;
  className?: string;
  displayMode?: 'code' | 'preview'; // How to display the LaTeX (since we can't render it)
}

export const LatexDisplay: React.FC<LatexDisplayProps> = ({
  type,
  data,
  title = 'LaTeX Representation',
  className = '',
  displayMode = 'code',
}) => {
  const { toast } = useToast();
  const { matrix, vector, solution, variableNames } = data;

  // Convert matrix to LaTeX format
  const matrixToLatex = (matrix: (number | string)[][]): string => {
    // Make sure we have a valid matrix
    if (!matrix || !matrix.length) return '\\begin{bmatrix}\\end{bmatrix}';
    
    // Format each row
    const rows = matrix.map(row => {
      // Join cells with & separator
      return row.map(cell => {
        // Handle numeric formatting
        if (typeof cell === 'number') {
          // Format floats nicely, keep integers as is
          return Number.isInteger(cell) ? cell.toString() : cell.toFixed(2);
        }
        return cell.toString();
      }).join(' & ');
    });
    
    // Join rows with \\ separator
    return `\\begin{bmatrix}\n${rows.join(' \\\\\n')}\n\\end{bmatrix}`;
  };

  // Convert vector to LaTeX format
  const vectorToLatex = (vector: (number | string)[]): string => {
    if (!vector || !vector.length) return '\\begin{bmatrix}\\end{bmatrix}';
    
    // Join elements with \\
    const elements = vector.map(element => {
      if (typeof element === 'number') {
        return Number.isInteger(element) ? element.toString() : element.toFixed(2);
      }
      return element.toString();
    });
    
    return `\\begin{bmatrix}\n${elements.join(' \\\\\n')}\n\\end{bmatrix}`;
  };

  // Generate variable names if not provided
  const getVariableNames = (): string[] => {
    if (variableNames && variableNames.length > 0) return variableNames;
    
    // Determine how many variables we need
    const numVars = matrix ? matrix[0].length : (vector ? vector.length : 0);
    
    // Generate default variable names (x_1, x_2, etc.)
    return Array.from({ length: numVars }, (_, i) => `x_{${i + 1}}`);
  };

  // Generate a system of equations in LaTeX
  const systemToLatex = (): string => {
    if (!matrix || !vector) return '\\text{Invalid system data}';
    
    const vars = getVariableNames();
    const rows = matrix.map((row, i) => {
      // Generate each equation
      const terms = row.map((coef, j) => {
        if (typeof coef === 'number' && Math.abs(coef) < 1e-10) return ''; // Skip zero coefficients
        
        const coefStr = typeof coef === 'number' 
          ? (coef === 1 ? '' : (coef === -1 ? '-' : coef.toString())) 
          : coef.toString();
        
        return `${j > 0 && coefStr.charAt(0) !== '-' ? '+ ' : ''}${coefStr}${coef === 0 ? '' : vars[j]} `;
      }).filter(Boolean); // Remove empty terms
      
      const rightSide = typeof vector[i] === 'number' 
        ? vector[i].toString() 
        : vector[i];
      
      return `${terms.join(' ')} = ${rightSide}`;
    });
    
    return `\\begin{cases}\n${rows.join(' \\\\\n')}\n\\end{cases}`;
  };

  // Generate augmented matrix in LaTeX
  const augmentedToLatex = (): string => {
    if (!matrix || !vector) return '\\text{Invalid augmented matrix data}';
    
    const augmented = matrix.map((row, i) => {
      // Create a new row with the vector element at the end
      return [...row, vector[i]];
    });
    
    // Now convert to LaTeX but with a vertical bar before the last column
    const rows = augmented.map(row => {
      const cells = row.map((cell, j) => {
        const formatted = typeof cell === 'number'
          ? (Number.isInteger(cell) ? cell.toString() : cell.toFixed(2))
          : cell.toString();
        
        // Add the vertical bar before the last column
        return j === row.length - 1 ? `\\vert ${formatted}` : formatted;
      }).join(' & ');
      
      return cells;
    });
    
    return `\\begin{bmatrix}\n${rows.join(' \\\\\n')}\n\\end{bmatrix}`;
  };

  // Generate solution equation in LaTeX
  const solutionToLatex = (): string => {
    if (!solution) return '\\text{No solution available}';
    
    const vars = getVariableNames();
    const solutionPairs = solution.map((val, i) => {
      return `${vars[i]} = ${Number.isInteger(val) ? val : val.toFixed(2)}`;
    });
    
    return solutionPairs.join(', \\quad ');
  };

  // Determine which LaTeX to generate based on type
  const generateLatex = (): string => {
    switch (type) {
      case 'matrix':
        return matrix ? matrixToLatex(matrix) : '\\text{No matrix data}';
      case 'vector':
        return vector ? vectorToLatex(vector) : '\\text{No vector data}';
      case 'augmented':
        return augmentedToLatex();
      case 'system':
        return systemToLatex();
      case 'equation':
        return solutionToLatex();
      default:
        return '\\text{Unknown LaTeX type}';
    }
  };

  const latexCode = generateLatex();

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      toast({
        title: "Copied to clipboard",
        description: "LaTeX code has been copied to your clipboard",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "There was an error copying to the clipboard",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
          <span className="sr-only">Copy LaTeX</span>
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className={`font-mono text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded-md ${
          displayMode === 'code' ? 'whitespace-pre-wrap break-all' : 'italic'
        }`}>
          {latexCode}
        </div>
        {displayMode === 'preview' && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            (LaTeX rendering preview not available - showing raw code)
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 