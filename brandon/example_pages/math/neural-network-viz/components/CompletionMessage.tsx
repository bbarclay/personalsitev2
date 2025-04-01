import { PartyPopper } from 'lucide-react';

interface CompletionMessageProps {
  show: boolean;
}

export const CompletionMessage = ({ show }: CompletionMessageProps) => {
  if (!show) return null;

  return (
    <div className="mt-6 text-center">
      <PartyPopper className="w-12 h-12 text-primary mx-auto animate-bounce" />
      <p className="text-xl text-primary mt-4">
        Training Complete! Your neural network is now ready to take on the
        world! 🌟
      </p>
    </div>
  );
};