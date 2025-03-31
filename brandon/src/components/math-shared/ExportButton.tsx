import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Step {
  explanation: string;
  matrix?: number[][];
  vector?: number[];
}

interface ExportButtonProps {
  data: Step[] | number[] | number[][] | any;
  type: 'steps' | 'solution' | 'matrix' | 'raw';
  filename?: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  includeTimestamp?: boolean;
  asClipboard?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  type,
  filename = 'export',
  buttonText,
  variant = 'outline',
  size = 'sm',
  includeTimestamp = true,
  asClipboard = false,
}) => {
  const { toast } = useToast();

  // Format the data based on the type
  const formatData = (): string => {
    if (!data) return '';

    switch (type) {
      case 'steps':
        // Format steps history for linear elimination
        if (Array.isArray(data)) {
          return (data as Step[]).map((step, index) => {
            let result = `Step ${index + 1}: ${step.explanation}\n`;
            if (step.matrix && Array.isArray(step.matrix)) {
              result += '\nMatrix:\n';
              step.matrix.forEach((row: number[], r: number) => {
                // If row is an array, pretty print it
                if (Array.isArray(row)) {
                  result += `[ ${row.map(val => val.toFixed(4).padStart(8)).join(', ')} ]\n`;
                }
              });
            }
            if (step.vector && Array.isArray(step.vector)) {
              result += '\nVector:\n';
              result += `[ ${step.vector.map(val => val.toFixed(4).padStart(8)).join(', ')} ]\n`;
            }
            return result + '\n';
          }).join('-------------------------------------------\n');
        }
        return JSON.stringify(data, null, 2);
        
      case 'solution':
        // Format solution vector for linear systems
        if (Array.isArray(data)) {
          return `Solution:\n${(data as number[]).map((val, i) => 
            `x${i + 1} = ${val}`
          ).join('\n')}`;
        }
        return JSON.stringify(data, null, 2);
        
      case 'matrix':
        // Format a matrix nicely
        if (Array.isArray(data)) {
          return (data as number[][]).map(row => {
            if (Array.isArray(row)) {
              return `[ ${row.map(val => 
                (typeof val === 'number' ? val.toFixed(4) : val).padStart(8)
              ).join(', ')} ]`;
            }
            return row;
          }).join('\n');
        }
        return JSON.stringify(data, null, 2);
        
      case 'raw':
      default:
        // Just convert to JSON string
        return JSON.stringify(data, null, 2);
    }
  };

  // Generate a filename with optional timestamp
  const getFilename = (): string => {
    let result = filename;
    
    if (includeTimestamp) {
      const date = new Date();
      const timestamp = date.toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
      result += `_${timestamp}`;
    }
    
    return `${result}.txt`;
  };

  // Handle clipboard copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatData());
      toast({
        title: "Copied to clipboard",
        description: "The data has been copied to your clipboard.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "There was an error copying to the clipboard.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Handle file download
  const handleDownload = () => {
    try {
      const formattedData = formatData();
      const blob = new Blob([formattedData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = getFilename();
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: `File "${getFilename()}" is being downloaded.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating the download.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Determine which action to take
  const handleClick = asClipboard ? handleCopy : handleDownload;
  
  // Determine button text and icon
  const icon = asClipboard ? <Copy className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />;
  const text = buttonText || (asClipboard ? 'Copy' : 'Export');

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      className="flex items-center"
    >
      {icon}
      {text}
    </Button>
  );
};