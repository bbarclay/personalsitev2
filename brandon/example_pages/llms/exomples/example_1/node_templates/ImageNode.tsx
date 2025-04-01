import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ImageNodeProps {
  data: {
    theme?: 'dark' | 'light';
    customClasses?: string;
    imageUrl?: string;
    label?: string;
  };
}

export const ImageNode = memo(({ data }: ImageNodeProps) => {
  const theme = data.theme || 'dark';
  const customClasses = data.customClasses || '';

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg ${customClasses}`}>
      <img src={data.imageUrl || "/api/placeholder/200/200"} alt={data.label} className="w-full h-48 object-cover" />
      {data.label && (
        <div className={`p-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <div className="font-medium">{data.label}</div>
        </div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  );
});
