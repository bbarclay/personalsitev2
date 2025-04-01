'use client';

import React, { Suspense } from 'react';
import { LazyBoundary } from '../types/lazyBoundary';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ErrorBoundary } from './ErrorBoundary';

export const LazyBoundaryComponent: React.FC<LazyBoundary> = ({
  fallback,
  children,
  onError,
  suspenseFallback,
}) => {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
    >
      <Suspense fallback={suspenseFallback || <div>Loading...</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
