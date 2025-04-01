import { ErrorInfo } from 'react';

export type ErrorHandler = (error: Error, errorInfo: ErrorInfo) => void;

export interface ErrorBoundaryHandlers {
  onError?: ErrorHandler;
  onReset?: () => void;
  onErrorMount?: ErrorHandler;
  onErrorUnmount?: ErrorHandler;
}
