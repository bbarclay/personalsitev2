import { memo } from 'react';
import { Bot, Brain, AlertTriangle } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  InfoBoxes,
  TrainingStatus,
  ToyRoom,
  TidinessScore,
  RobotVision,
  LearningProgress,
  WeightsDisplay,
  CompletionMessage,
  TrainingControls,
} from './components';
import { ErrorBoundary } from './ErrorBoundary';
import { useTraining } from './hooks';
import { STORY_PHASES } from './constants';
import { TrainingState, TrainingControls as TrainingControlsType } from './types';

interface HeaderProps {
  title: string;
  description: string;
}

const Header = memo(({ title, description }: HeaderProps) => (
  <div className="flex items-center gap-3 mb-6">
    <Bot className="w-8 h-8 text-primary animate-bounce" />
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        {title}
      </h2>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
));

interface LearningProgressSectionProps {
  loss: number[];
}

const LearningProgressSection = memo(({ loss }: LearningProgressSectionProps) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
      <Brain className="w-5 h-5" />
      Robot&apos;s Learning Progress
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TidinessScore loss={loss} />
      <LearningProgress loss={loss} />
    </div>
  </div>
));

// Component interfaces
interface MainContentProps extends TrainingState, TrainingControlsType {}

const MainContent = memo(({
  data,
  weights,
  iteration,
  isTraining,
  trainingPhase,
  loss,
  handlePlayPause,
  handleReset
}: MainContentProps) => (
  <>
    <TrainingControls
      isTraining={isTraining}
      onPlayPause={handlePlayPause}
      onReset={handleReset}
      iteration={iteration}
    />
    <TrainingStatus iteration={iteration} trainingPhase={trainingPhase} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ToyRoom 
        data={data} 
        weights={weights} 
        iteration={iteration}
        isTraining={isTraining}
      />
      <RobotVision 
        data={data} 
        weights={weights}
        isTraining={isTraining}
      />
    </div>

    <LearningProgressSection loss={loss} />
    <WeightsDisplay weights={weights} />
    <CompletionMessage show={trainingPhase === 'complete'} />
  </>
));

const NeuralNetworkViz = () => {
  const [
    { iteration, data, weights, loss, isTraining, trainingPhase, error },
    { handlePlayPause, handleReset }
  ] = useTraining();

  const currentPhase = Math.min(Math.floor(iteration / 20), 5);
  const { title, description } = STORY_PHASES[currentPhase];

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="p-6 bg-background text-foreground rounded-lg shadow-xl relative">
          <div className="relative z-10">
            <Header title={title} description={description} />
            <InfoBoxes />
          </div>
          
          <div className="relative z-0">
            {error ? (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Oops! The robot got confused</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <MainContent
                data={data}
                weights={weights}
                iteration={iteration}
                isTraining={isTraining}
                trainingPhase={trainingPhase}
                loss={loss}
                handlePlayPause={handlePlayPause}
                handleReset={handleReset}
              />
            )}
          </div>
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default NeuralNetworkViz;