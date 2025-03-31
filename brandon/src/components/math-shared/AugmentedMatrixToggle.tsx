import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AugmentedMatrixToggleProps {
  showAugmented: boolean;
  onToggle: (show: boolean) => void;
  className?: string;
  label?: string;
}

export const AugmentedMatrixToggle: React.FC<AugmentedMatrixToggleProps> = ({
  showAugmented,
  onToggle,
  className = '',
  label = 'Show Augmented Matrix',
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Display Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="augmented-toggle"
              checked={showAugmented}
              onCheckedChange={onToggle}
            />
            <Label
              htmlFor="augmented-toggle"
              className="cursor-pointer"
            >
              {label}
            </Label>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 pl-9">
            {showAugmented ? (
              <p>Displaying matrix A and vector b together as [A|b]</p>
            ) : (
              <p>Displaying coefficient matrix A only</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 