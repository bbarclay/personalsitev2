import { Brain, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const InfoBoxes = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Card className="bg-background/50 border-border/50 flex-1">
        <CardContent className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">What is this?</h3>
            <p className="text-muted-foreground text-sm">
              Visualize how a simple neural network learns to classify data points.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/50 border-border/50 flex-1">
        <CardContent className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">How does it work?</h3>
            <p className="text-muted-foreground text-sm">
              Watch the weights update and see the decision boundary evolve in real-time.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/50 border-border/50 flex-1">
        <CardContent className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <div>
            <h3 className="font-semibold text-primary">Training Progress</h3>
            <p className="text-muted-foreground text-sm">
              Track the loss over iterations and understand the learning curve.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};