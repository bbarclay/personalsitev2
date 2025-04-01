import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';

interface RREFToggleProps {
  onCalculateRREF: () => void;
  isRREF: boolean;
  disabled?: boolean;
  className?: string;
}

export const RREFToggle: React.FC<RREFToggleProps> = ({
  onCalculateRREF,
  isRREF,
  disabled = false,
  className = '',
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Row Echelon Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm mr-2">Current Form:</span>
              <span className="font-medium text-sm">
                {isRREF ? 'RREF (Reduced)' : 'REF (Standard)'}
              </span>
            </div>
            <Button
              size="sm"
              variant={isRREF ? "secondary" : "default"}
              onClick={onCalculateRREF}
              disabled={disabled || isRREF}
            >
              {isRREF ? 'Already in RREF' : 'Calculate RREF'}
            </Button>
          </div>
          
          <div className="flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              REF (Row Echelon Form) has zeros below the pivots. 
              RREF (Reduced Row Echelon Form) adds zeros above the pivots and scales pivots to 1.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 