import { PyramidBuildersWrapper } from './components/PyramidBuildersWrapper';

// Export metadata for Next.js
export const metadata = {
  title: "Pyramid Builders",
  description: "Master geometry by solving triangle challenges to build an ancient pyramid. Calculate missing angles and identify triangle types to become a Master Architect."
};

export default function PyramidBuildersPage() {
  return (
    <div>
      <PyramidBuildersWrapper />
    </div>
  );
} 