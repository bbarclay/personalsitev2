import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Code } from 'lucide-react';

interface InputErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onReset?: () => void;
  onReportError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface InputErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class InputErrorBoundary extends Component<InputErrorBoundaryProps, InputErrorBoundaryState> {
  constructor(props: InputErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<InputErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Update state
    this.setState({
      error,
      errorInfo
    });
    
    // Call optional reporting callback
    if (this.props.onReportError) {
      this.props.onReportError(error, errorInfo);
    }
    
    // Log error to console for debugging
    console.error('Matrix calculation error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback was provided, use it
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }
      
      // Otherwise, use the default error UI
      return (
        <Card className="border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center text-red-700 dark:text-red-300">
              <AlertCircle className="h-5 w-5 mr-2" />
              Calculation Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-red-600 dark:text-red-400">
                Sorry, an error occurred while performing the matrix calculations. 
                This could be due to invalid input data or numerical issues.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={this.handleReset}
                  className="flex items-center"
                >
                  <RefreshCw className="mr-1.5 h-4 w-4" />
                  Reset Calculations
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={this.toggleDetails}
                  className="flex items-center"
                >
                  <Code className="mr-1.5 h-4 w-4" />
                  {this.state.showDetails ? 'Hide' : 'Show'} Error Details
                </Button>
              </div>
              
              {this.state.showDetails && (
                <div className="mt-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded text-sm font-mono overflow-auto max-h-[200px] text-red-600 dark:text-red-400 whitespace-pre-wrap">
                    {this.state.error?.toString()}
                    {this.state.errorInfo?.componentStack}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Please check your input data and try again. If the problem persists, consider simplifying the matrix or contacting support.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
} 