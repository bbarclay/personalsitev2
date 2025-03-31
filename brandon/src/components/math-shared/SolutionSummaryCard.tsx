import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface SolutionSummaryCardProps {
  solution: number[] | null;
  systemProperties?: {
    isConsistent?: boolean;
    hasSingleSolution?: boolean;
    hasInfiniteSolutions?: boolean;
    hasNoSolution?: boolean;
    rank?: number;
    determinant?: number | null;
  };
  matrixSize: number;
  className?: string;
}

export const SolutionSummaryCard: React.FC<SolutionSummaryCardProps> = ({
  solution,
  systemProperties,
  matrixSize,
  className = '',
}) => {
  // Determine solution type
  let solutionType: 'unique' | 'infinite' | 'none' | 'unknown' = 'unknown';
  
  if (systemProperties) {
    if (systemProperties.hasNoSolution) {
      solutionType = 'none';
    } else if (systemProperties.hasInfiniteSolutions) {
      solutionType = 'infinite';
    } else if (systemProperties.hasSingleSolution) {
      solutionType = 'unique';
    }
  } else if (solution) {
    solutionType = 'unique';
  } else if (solution === null) {
    // We have to guess without system properties
    solutionType = 'unknown';
  }

  // Generate explanation text based on solution type
  const getExplanation = () => {
    switch (solutionType) {
      case 'unique':
        return {
          title: 'Unique Solution',
          text: `This system has exactly one solution. The solution vector represents the unique values of the ${matrixSize} variables that satisfy all equations simultaneously.`,
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          badgeColor: 'success'
        };
      case 'infinite':
        return {
          title: 'Infinitely Many Solutions',
          text: `This system has infinitely many solutions. This typically occurs when the system has fewer independent equations than variables, leading to free variables that can take any value.`,
          icon: <Info className="h-5 w-5 text-blue-500" />,
          badgeColor: 'info'
        };
      case 'none':
        return {
          title: 'No Solution',
          text: `This system has no solution. This means the equations are inconsistent - there is no set of values that can satisfy all equations simultaneously.`,
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          badgeColor: 'destructive'
        };
      default:
        return {
          title: 'Solution Status Unknown',
          text: 'Solve the system to determine the solution status.',
          icon: <Info className="h-5 w-5 text-gray-500" />,
          badgeColor: 'secondary'
        };
    }
  };

  const { title, text, icon, badgeColor } = getExplanation();

  // Additional details based on system properties
  const getAdditionalDetails = () => {
    if (!systemProperties) return null;

    const details = [];

    if (systemProperties.rank !== undefined) {
      details.push(`Matrix rank: ${systemProperties.rank}`);
    }

    if (systemProperties.determinant !== undefined) {
      const detValue = systemProperties.determinant;
      if (detValue === null) {
        details.push('Determinant: Not applicable (non-square matrix)');
      } else if (Math.abs(detValue) < 1e-10) {
        details.push('Determinant: 0 (Singular matrix)');
      } else {
        details.push(`Determinant: ${detValue.toFixed(4)}`);
      }
    }

    return details.length > 0 ? (
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-sm font-medium mb-2">Additional System Properties:</h4>
        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  // Generate readable solution if it exists
  const getSolutionDisplay = () => {
    if (!solution || solutionType !== 'unique') return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-sm font-medium mb-2">Solution Values:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {solution.map((value, index) => (
            <div 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono flex justify-between"
            >
              <span>x<sub>{index + 1}</sub> =</span>
              <span>{value.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
          <Badge variant={badgeColor as any}>{solutionType}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
        {getSolutionDisplay()}
        {getAdditionalDetails()}
      </CardContent>
    </Card>
  );
}; 