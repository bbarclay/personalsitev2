import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NumericDisplayProps {
  label: string;
  value: number | null | undefined;
  precision?: number;  // Number of decimal places
  showSign?: boolean;  // Whether to always show + for positive numbers
  showZeroAsExact?: boolean; // Whether to show small values as true zero
  className?: string;
  fallbackText?: string; // Text to show when value is null/undefined
  badge?: string; // Optional badge text (e.g., "Singular" for determinant = 0)
  badgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning' | 'info'; // Badge style
}

export const NumericDisplay: React.FC<NumericDisplayProps> = ({
  label,
  value,
  precision = 4,
  showSign = false,
  showZeroAsExact = true,
  className = '',
  fallbackText = 'Not calculated',
  badge,
  badgeVariant = 'secondary',
}) => {
  // Helper to format the number with proper precision
  const formatNumber = (num: number): string => {
    // Check if the value is essentially zero (floating point approximation)
    const isZero = showZeroAsExact && Math.abs(num) < 1e-10;
    
    if (isZero) return '0';
    
    // Format with proper precision
    const formatted = num.toFixed(precision);
    
    // If the formatted number ends with zeros after the decimal point, trim them
    const trimmed = formatted.replace(/\.?0+$/, '');
    
    // Add sign if requested and positive
    return showSign && num > 0 ? `+${trimmed}` : trimmed;
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          {badge && (
            <Badge variant={badgeVariant} className="ml-2">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="text-2xl font-bold">
          {value !== null && value !== undefined 
            ? formatNumber(value)
            : <span className="text-gray-500 dark:text-gray-400 text-base">{fallbackText}</span>
          }
        </div>
      </CardContent>
    </Card>
  );
}; 