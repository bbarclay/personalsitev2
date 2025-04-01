export interface LifecycleEvents {
  onMount?: () => void;
  onUnmount?: () => void;
  onUpdate?: (prevProps: any) => void;
  onError?: (error: Error) => void;
}
