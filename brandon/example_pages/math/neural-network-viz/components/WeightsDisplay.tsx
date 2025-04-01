import { Brain } from 'lucide-react';
import { Card, CardContent } from '@components/ui/card';

interface WeightsDisplayProps {
  weights: number[];
}

export const WeightsDisplay = ({ weights }: WeightsDisplayProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {weights.map((weight: number, index: number) => (
        <Card key={index} className="bg-background/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <div className="text-sm text-muted-foreground">Synapse {index + 1}</div>
            </div>
            <div className="text-xl font-mono text-primary mt-2">
              {weight.toFixed(3)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};