import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Info } from 'lucide-react';

interface CalculationStatusProps {
  error: string | null;
  infoMessage: string | null;
}

export const CalculationStatus: React.FC<CalculationStatusProps> = ({
  error,
  infoMessage,
}) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      {infoMessage && !error && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4">
          <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-200">Information</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-300">{infoMessage}</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
