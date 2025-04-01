import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraction Visualizer | Interactive Math Learning',
  description: 'An interactive tool to help kids understand fractions through visual representations. Explore adding, subtracting, multiplying, and dividing fractions with this fun calculator!',
  keywords: ['fractions', 'math', 'education', 'interactive', 'visualization', 'learning'],
};

export const styles = {
  container: 'flex flex-col min-h-screen [--tooltip-bg:rgba(255,255,255,0.9)] [--tooltip-border:1px_solid_#ccc] [--tooltip-color:#333] dark:[--tooltip-bg:rgba(31,41,55,0.9)] dark:[--tooltip-border:1px_solid_#4b5563] dark:[--tooltip-color:#e5e7eb]',
  main: 'flex-1',
  content: 'mt-6 flex overflow-hidden max-w-[1600px] mx-auto w-full gap-6 px-6',
  controls: 'w-[400px] bg-background/50 backdrop-blur-[1px] p-6 overflow-y-auto',
  visualization: 'w-2/3 p-6 overflow-y-auto',
  panel: 'bg-background/50 backdrop-blur-[1px] rounded-lg p-4 border border-foreground/10',
  title: 'text-title mb-4',
  button: 'glass-button w-full',
};
