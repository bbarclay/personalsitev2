import { MathCards } from '../designelements/components/math-cards';

export const metadata = {
  title: 'Mathematical Card Designs | Brandon',
  description: 'Showcase of different mathematical concept card designs and styles',
};

export default function MathCardsPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <MathCards />
    </main>
  );
}