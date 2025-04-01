'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DinoGame Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
            <div className="text-6xl mb-4">🦖</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! The dinosaurs got loose!
            </h2>
            <p className="text-gray-600 mb-4">
              Something went wrong in the game. Try refreshing the page or come back later.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
