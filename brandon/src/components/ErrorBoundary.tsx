'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Something went wrong</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{this.state.error?.message || 'An error occurred while rendering this component'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 