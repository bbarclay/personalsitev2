export interface GradientStop {
  offset: number;
  color: string;
}

export type GradientConfig = {
  stops: GradientStop[];
  interpolationMode: 'linear' | 'bezier';
};
