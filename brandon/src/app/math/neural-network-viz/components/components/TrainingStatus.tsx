import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrainingPhase } from '../types';
import { MESSAGES } from '../constants';

interface TrainingStatusProps {
  iteration: number;
  trainingPhase: TrainingPhase;
}

export const TrainingStatus = ({ iteration, trainingPhase }: TrainingStatusProps) => {
  const { icon: PhaseIcon, text } = MESSAGES[trainingPhase];

  return (
    <Alert className="mb-6 bg-background/50 border-primary">
      <PhaseIcon className="w-5 h-5 text-primary" />
      <AlertTitle className="text-primary">
        Mission Status: {iteration}/100
      </AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {text}
      </AlertDescription>
    </Alert>
  );
};