import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, ArrowDown, Plus, X } from "lucide-react";

// Operation type definitions
type SwapOperation = {
  type: 'swap';
  row1: number;
  row2: number;
};

type ScaleOperation = {
  type: 'scale';
  row: number;
  scalar: number;
};

type AddOperation = {
  type: 'add';
  sourceRow: number;
  targetRow: number;
  scalar: number;
};

export type RowOperation = SwapOperation | ScaleOperation | AddOperation;

interface RowOperationControlsProps {
  matrixSize: number;
  onApplyOperation: (operation: RowOperation) => void;
  disabled?: boolean;
  className?: string;
}

export const RowOperationControls: React.FC<RowOperationControlsProps> = ({
  matrixSize,
  onApplyOperation,
  disabled = false,
  className = '',
}) => {
  const [operationType, setOperationType] = useState<'swap' | 'scale' | 'add'>('swap');
  
  // State for swap operation
  const [swapRow1, setSwapRow1] = useState<string>('1');
  const [swapRow2, setSwapRow2] = useState<string>('2');
  
  // State for scale operation
  const [scaleRow, setScaleRow] = useState<string>('1');
  const [scaleValue, setScaleValue] = useState<string>('1');
  
  // State for add operation
  const [addSourceRow, setAddSourceRow] = useState<string>('1');
  const [addTargetRow, setAddTargetRow] = useState<string>('2');
  const [addScalar, setAddScalar] = useState<string>('1');
  
  // Generate options for row selectors
  const rowOptions = Array.from({ length: matrixSize }, (_, i) => (i + 1).toString());
  
  const handleApply = () => {
    try {
      switch (operationType) {
        case 'swap': {
          const r1 = parseInt(swapRow1) - 1; // Convert to 0-based index
          const r2 = parseInt(swapRow2) - 1;
          
          // Validate inputs
          if (isNaN(r1) || isNaN(r2) || r1 < 0 || r2 < 0 || r1 >= matrixSize || r2 >= matrixSize) {
            alert('Invalid row numbers for swap operation');
            return;
          }
          
          onApplyOperation({
            type: 'swap',
            row1: r1,
            row2: r2
          });
          break;
        }
        
        case 'scale': {
          const row = parseInt(scaleRow) - 1; // Convert to 0-based index
          const scalar = parseFloat(scaleValue);
          
          // Validate inputs
          if (isNaN(row) || row < 0 || row >= matrixSize) {
            alert('Invalid row number for scale operation');
            return;
          }
          
          if (isNaN(scalar)) {
            alert('Invalid scalar value for scale operation');
            return;
          }
          
          if (scalar === 0) {
            alert('Scalar cannot be zero (would create a zero row)');
            return;
          }
          
          onApplyOperation({
            type: 'scale',
            row,
            scalar
          });
          break;
        }
        
        case 'add': {
          const sourceRow = parseInt(addSourceRow) - 1; // Convert to 0-based index
          const targetRow = parseInt(addTargetRow) - 1;
          const scalar = parseFloat(addScalar);
          
          // Validate inputs
          if (isNaN(sourceRow) || isNaN(targetRow) || 
              sourceRow < 0 || targetRow < 0 || 
              sourceRow >= matrixSize || targetRow >= matrixSize) {
            alert('Invalid row numbers for add operation');
            return;
          }
          
          if (isNaN(scalar)) {
            alert('Invalid scalar value for add operation');
            return;
          }
          
          // Can be zero, but warn about it
          if (scalar === 0) {
            if (!confirm('Adding 0 times a row will not change the matrix. Continue?')) {
              return;
            }
          }
          
          onApplyOperation({
            type: 'add',
            sourceRow,
            targetRow,
            scalar
          });
          break;
        }
      }
    } catch (error) {
      console.error('Error applying row operation:', error);
      alert('An error occurred while applying the operation');
    }
  };

  // Format operation description for display
  const getOperationDescription = (): string => {
    switch (operationType) {
      case 'swap':
        return `R${swapRow1} ↔ R${swapRow2}`;
      case 'scale':
        return `${scaleValue} × R${scaleRow} → R${scaleRow}`;
      case 'add':
        return `R${addTargetRow} + (${addScalar} × R${addSourceRow}) → R${addTargetRow}`;
      default:
        return '';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Row Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="operation-type">Operation Type</Label>
            <Select
              disabled={disabled}
              value={operationType}
              onValueChange={(value: 'swap' | 'scale' | 'add') => setOperationType(value)}
            >
              <SelectTrigger id="operation-type" className="w-full">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="swap">
                  <div className="flex items-center">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    <span>Swap Rows</span>
                  </div>
                </SelectItem>
                <SelectItem value="scale">
                  <div className="flex items-center">
                    <X className="mr-2 h-4 w-4" />
                    <span>Scale Row</span>
                  </div>
                </SelectItem>
                <SelectItem value="add">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add Multiple of Row</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Operation-specific inputs */}
          {operationType === 'swap' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="swap-row1">First Row</Label>
                <Select
                  disabled={disabled}
                  value={swapRow1}
                  onValueChange={setSwapRow1}
                >
                  <SelectTrigger id="swap-row1">
                    <SelectValue placeholder="Select row" />
                  </SelectTrigger>
                  <SelectContent>
                    {rowOptions.map(opt => (
                      <SelectItem key={`swap1-${opt}`} value={opt}>
                        Row {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="swap-row2">Second Row</Label>
                <Select
                  disabled={disabled}
                  value={swapRow2}
                  onValueChange={setSwapRow2}
                >
                  <SelectTrigger id="swap-row2">
                    <SelectValue placeholder="Select row" />
                  </SelectTrigger>
                  <SelectContent>
                    {rowOptions.map(opt => (
                      <SelectItem key={`swap2-${opt}`} value={opt}>
                        Row {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {operationType === 'scale' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scale-row">Row to Scale</Label>
                <Select
                  disabled={disabled}
                  value={scaleRow}
                  onValueChange={setScaleRow}
                >
                  <SelectTrigger id="scale-row">
                    <SelectValue placeholder="Select row" />
                  </SelectTrigger>
                  <SelectContent>
                    {rowOptions.map(opt => (
                      <SelectItem key={`scale-row-${opt}`} value={opt}>
                        Row {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="scale-value">Scalar Value</Label>
                <Input
                  id="scale-value"
                  type="number"
                  step="any"
                  disabled={disabled}
                  value={scaleValue}
                  onChange={(e) => setScaleValue(e.target.value)}
                  placeholder="Enter a number"
                />
              </div>
            </div>
          )}
          
          {operationType === 'add' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-source">Source Row</Label>
                  <Select
                    disabled={disabled}
                    value={addSourceRow}
                    onValueChange={setAddSourceRow}
                  >
                    <SelectTrigger id="add-source">
                      <SelectValue placeholder="Select source row" />
                    </SelectTrigger>
                    <SelectContent>
                      {rowOptions.map(opt => (
                        <SelectItem key={`add-src-${opt}`} value={opt}>
                          Row {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-scalar">Scalar Multiplier</Label>
                  <Input
                    id="add-scalar"
                    type="number"
                    step="any"
                    disabled={disabled}
                    value={addScalar}
                    onChange={(e) => setAddScalar(e.target.value)}
                    placeholder="Enter a number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="add-target">Target Row (to be replaced)</Label>
                <Select
                  disabled={disabled}
                  value={addTargetRow}
                  onValueChange={setAddTargetRow}
                >
                  <SelectTrigger id="add-target">
                    <SelectValue placeholder="Select target row" />
                  </SelectTrigger>
                  <SelectContent>
                    {rowOptions.map(opt => (
                      <SelectItem key={`add-tgt-${opt}`} value={opt}>
                        Row {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Operation preview */}
          <div className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
            {getOperationDescription()}
          </div>
          
          <Button
            onClick={handleApply}
            disabled={disabled}
            className="w-full"
          >
            Apply Operation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 