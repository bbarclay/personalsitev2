export type AnimationFrameCallback = (timestamp: DOMHighResTimeStamp) => void;

export interface AnimationController {
  start: (callback: AnimationFrameCallback) => void;
  stop: () => void;
  isRunning: boolean;
}
