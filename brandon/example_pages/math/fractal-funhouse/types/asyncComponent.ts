export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncComponentState<T> {
  data: T | null;
  state: LoadingState;
  error: Error | null;
}
