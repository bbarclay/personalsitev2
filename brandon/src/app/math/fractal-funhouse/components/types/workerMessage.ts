export type WorkerMessage<T> = {
  id: string;
  type: string;
  payload: T;
  timestamp: number;
};
