export interface RenderCycle {
  frameId: number;
  startTimestamp: DOMHighResTimeStamp;
  endTimestamp: DOMHighResTimeStamp;
  duration: number;
  fps: number;
}
