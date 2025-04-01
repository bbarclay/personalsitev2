'use client';
// @xyflow/react/dist/style.css
import '@xyflow/react/dist/style.css';

import Flow from './Flow';

export default function BranchingExamplePage() {
  return (
    <div className="w-full h-[800px]">
      <div> This is a branching example page </div>
      <Flow />
    </div>
  );
}
