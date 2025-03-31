import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertCircle, CheckCircle2, Divide } from 'lucide-react';
import { calculateDeterminant, isMatrixSingular } from '@/lib/math-utils';

interface MatrixPropertiesCardProps {
  matrix: number[][];
  isCalculated?: boolean; // Whether properties can be calculated yet (valid inputs)
  className?: string;
}

export const MatrixPropertiesCard: React.FC<MatrixPropertiesCardProps> = ({
  matrix,
  isCalculated = true,
  className = '',
}) => {
  // Calculate various matrix properties
  const isSquare = matrix.length > 0 && matrix.length === matrix[0]?.length;
  const size = isSquare ? matrix.length : `${matrix.length}x${matrix[0]?.length || 0}`;
  
  // Only calculate these if matrix is valid and calculation is enabled
  const determinant = isCalculated && isSquare ? calculateDeterminant(matrix) : null;
  const isSingular = isCalculated && isSquare ? isMatrixSingular(matrix) : null;
  
  // Calculate rank using RREF method
  const calculateRank = (mat: number[][]): number => {
    if (!isCalculated || mat.length === 0) return 0;
    
    // Copy matrix to avoid modification
    const m = mat.map(row => [...row]);
    const rows = m.length;
    const cols = m[0].length;
    
    // Gaussian elimination to find rank
    let rank = 0;
    const rowsUsed = new Array(rows).fill(false);
    
    for (let col = 0; col < cols; col++) {
      let pivotRow = -1;
      
      // Find pivot row
      for (let row = 0; row < rows; row++) {
        if (!rowsUsed[row] && Math.abs(m[row][col]) > 1e-10) {
          pivotRow = row;
          break;
        }
      }
      
      if (pivotRow !== -1) {
        rowsUsed[pivotRow] = true;
        rank++;
        
        // Normalize pivot row
        const pivot = m[pivotRow][col];
        for (let c = col; c < cols; c++) {
          m[pivotRow][c] /= pivot;
        }
        
        // Eliminate other rows
        for (let r = 0; r < rows; r++) {
          if (r !== pivotRow && Math.abs(m[r][col]) > 1e-10) {
            const factor = m[r][col];
            for (let c = col; c < cols; c++) {
              m[r][c] -= factor * m[pivotRow][c];
            }
          }
        }
      }
    }
    
    return rank;
  };
  
  const rank = isCalculated ? calculateRank(matrix) : null;
  
  // Calculate trace (sum of diagonal elements)
  const calculateTrace = (mat: number[][]): number | null => {
    if (!isSquare) return null;
    
    let trace = 0;
    for (let i = 0; i < mat.length; i++) {
      trace += mat[i][i];
    }
    return trace;
  };
  
  const trace = isCalculated && isSquare ? calculateTrace(matrix) : null;
  
  // Calculate a simple condition estimate for 2x2 matrices
  const calculateConditionEstimate = (mat: number[][]): number | null => {
    if (!isSquare || mat.length !== 2 || determinant === null || Math.abs(determinant) < 1e-10) {
      return null;
    }
    
    // For 2x2 matrices, use a simple formula based on Frobenius norm
    const a = mat[0][0], b = mat[0][1], c = mat[1][0], d = mat[1][1];
    const normA = Math.sqrt(a*a + b*b + c*c + d*d);
    
    // Inverse matrix elements
    const invDet = 1 / determinant;
    const invA = d * invDet;
    const invB = -b * invDet;
    const invC = -c * invDet;
    const invD = a * invDet;
    
    const normAInv = Math.sqrt(invA*invA + invB*invB + invC*invC + invD*invD);
    
    return normA * normAInv;
  };
  
  const conditionNumber = isCalculated && isSquare && matrix.length === 2 
    ? calculateConditionEstimate(matrix) 
    : null;
  
  // Format properties for display
  const formatNumber = (num: number | null): string => {
    if (num === null) return 'N/A';
    
    // For very close to zero values
    if (Math.abs(num) < 1e-10) return '0';
    
    // For normal values, format with 4 decimal places
    return num.toFixed(4);
  };
  
  // Get singularity badge
  const getSingularityBadge = () => {
    if (!isSquare) return null;
    
    if (isSingular) {
      return <Badge variant="destructive">Singular</Badge>;
    } else if (isSingular === false) {
      return <Badge variant="success">Non-singular</Badge>;
    }
    
    return null;
  };
  
  // Get conditioning badge (only for 2x2 matrices)
  const getConditioningBadge = () => {
    if (conditionNumber === null) return null;
    
    if (conditionNumber < 10) {
      return <Badge variant="success">Well-conditioned</Badge>;
    } else if (conditionNumber < 100) {
      return <Badge variant="warning">Moderately conditioned</Badge>;
    } else {
      return <Badge variant="destructive">Ill-conditioned</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center">
            <Calculator className="h-5 w-5 text-blue-500 mr-2" />
            Matrix Properties
          </CardTitle>
          <Badge variant="secondary">{typeof size === 'string' ? size : `${size}x${size}`}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium mb-1">Dimensions</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {matrix.length} × {matrix[0]?.length || 0}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center justify-between">
                <span>Determinant</span>
                {getSingularityBadge()}
              </h3>
              <p className={`text-sm ${isSquare ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 italic'}`}>
                {isSquare 
                  ? formatNumber(determinant)
                  : 'Only defined for square matrices'}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Rank</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {rank !== null ? rank : 'Not calculated'}
              </p>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium mb-1">Trace</h3>
              <p className={`text-sm ${isSquare ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 italic'}`}>
                {isSquare 
                  ? formatNumber(trace)
                  : 'Only defined for square matrices'}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center justify-between">
                <span>Condition Number</span>
                {getConditioningBadge()}
              </h3>
              <p className={`text-sm ${conditionNumber !== null ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 italic'}`}>
                {conditionNumber !== null 
                  ? formatNumber(conditionNumber)
                  : 'Only calculated for 2×2 matrices'}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Full Rank</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                {rank !== null && (
                  rank === Math.min(matrix.length, matrix[0]?.length || 0) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                      Yes
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                      No
                    </>
                  )
                )}
              </p>
            </div>
          </div>
        </div>
        
        {!isCalculated && (
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            Some properties could not be calculated. Please ensure all matrix values are valid.
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 