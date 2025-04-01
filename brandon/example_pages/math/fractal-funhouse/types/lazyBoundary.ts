export interface LazyBoundary {
  fallback: React.ReactNode;
  children: React.ReactNode;
  onError?: (error: Error) => void;
  suspenseFallback?: React.ReactNode;
}
