export interface RenderScheduler {
  schedule: (task: () => void, priority: 'high' | 'low') => string;
  cancel: (taskId: string) => void;
  flush: () => void;
}
