export const metadata = {
  title: 'Math Tools & Calculators | Brandon',
  description: 'Explore our collection of interactive mathematical tools and calculators',
};

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
} 