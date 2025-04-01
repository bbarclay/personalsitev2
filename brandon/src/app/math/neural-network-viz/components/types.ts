import { LucideIcon } from 'lucide-react';

export interface DataPoint {
  x: number;
  y: number;
  label: number;
}

export interface VisualizationPoint extends DataPoint {
  key: string;
  prediction: number;
}

export type TrainingPhase =
  | 'starting'
  | 'exploring'
  | 'learning'
  | 'refining'
  | 'finalizing'
  | 'complete';

export interface PhaseMessage {
  icon: LucideIcon;
  text: string;
}

export interface TrainingState {
  iteration: number;
  data: DataPoint[];
  weights: number[];
  loss: number[];
  isTraining: boolean;
  trainingPhase: TrainingPhase;
  error?: string;
}

export interface TrainingControls {
  handlePlayPause: () => void;
  handleReset: () => void;
}