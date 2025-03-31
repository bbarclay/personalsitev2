import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, CheckIcon, XIcon, RefreshCwIcon } from 'lucide-react';

interface VariableNamingControlProps {
  variableCount: number;
  variableNames: string[];
  onVariableNamesChange: (names: string[]) => void;
  className?: string;
}

export const VariableNamingControl: React.FC<VariableNamingControlProps> = ({
  variableCount,
  variableNames,
  onVariableNamesChange,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNames, setEditedNames] = useState<string[]>([...variableNames]);
  
  // Generate default variable names (x₁, x₂, etc.)
  const getDefaultVariableNames = (): string[] => {
    return Array.from({ length: variableCount }, (_, i) => `x${i + 1}`);
  };
  
  // Initialize names if they're missing or of wrong length
  const ensureVariableNames = () => {
    if (!variableNames || variableNames.length !== variableCount) {
      const defaultNames = getDefaultVariableNames();
      onVariableNamesChange(defaultNames);
      setEditedNames(defaultNames);
    }
  };
  
  // React to changes in variable count
  React.useEffect(() => {
    ensureVariableNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variableCount]);
  
  // Handle input change for a single variable name
  const handleNameChange = (index: number, value: string) => {
    const newNames = [...editedNames];
    newNames[index] = value;
    setEditedNames(newNames);
  };
  
  // Save the edited names
  const handleSave = () => {
    // Ensure no empty names
    const sanitizedNames = editedNames.map(name => name.trim() || `x${editedNames.indexOf(name) + 1}`);
    onVariableNamesChange(sanitizedNames);
    setEditedNames(sanitizedNames);
    setIsEditing(false);
  };
  
  // Cancel editing and revert to current names
  const handleCancel = () => {
    setEditedNames([...variableNames]);
    setIsEditing(false);
  };
  
  // Reset to default names
  const handleReset = () => {
    const defaultNames = getDefaultVariableNames();
    setEditedNames(defaultNames);
    if (!isEditing) {
      onVariableNamesChange(defaultNames);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Variable Names</CardTitle>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="h-8"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="h-8"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleSave}
                  className="h-8"
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCancel}
                  className="h-8"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {editedNames.map((name, index) => (
              <div key={index}>
                <Label htmlFor={`var-name-${index}`} className="text-xs mb-1 block">
                  Variable {index + 1}
                </Label>
                <Input
                  id={`var-name-${index}`}
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="h-8 text-sm"
                  maxLength={5} // Prevent overly long names
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {variableNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1.5 px-3 bg-gray-100 dark:bg-gray-800 rounded-md"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">Var {index + 1}:</span>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {isEditing 
            ? 'Enter custom names for each variable in your system.' 
            : 'These variable names will be used in solution displays and LaTeX output.'}
        </div>
      </CardContent>
    </Card>
  );
}; 