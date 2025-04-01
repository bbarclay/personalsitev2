import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SolutionDisplayProps {
  solution: number[] | null;
  error: string | null; // Pass error to prevent showing solution if there was an error
}

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({
  solution,
  error,
}) => {
  if (!solution || error) {
    return null; // Don't render if no solution or if there's an error
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Alert variant="default" className="bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 mt-6">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-200">Solution Found</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {solution.map((val, i) => (
              <span key={`sol-${i}`} className="font-mono">
                x<sub>{i + 1}</sub> = {val.toFixed(4)}
              </span>
            ))}
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};
