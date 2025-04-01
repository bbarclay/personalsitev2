export type AsyncOperationResult<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
