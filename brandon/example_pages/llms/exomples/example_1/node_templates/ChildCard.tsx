import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { User } from 'lucide-react';

interface ChildCardProps {
  data: {
    type?: 'image' | 'icon';
    customClasses?: string;
    tooltip?: {
      position?: Position;
      label: string;
    };
    imageUrl?: string;
    name: string;
    age?: number;
    id: string;
    scale?: number;
  };
  theme?: 'dark' | 'light';
}

const tooltipPositionStyles = {
  [Position.Top]: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  [Position.Bottom]: 'top-full left-1/2 -translate-x-1/2 mt-2',
  [Position.Left]: 'right-full top-1/2 -translate-y-1/2 mr-2',
  [Position.Right]: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const ChildCard = memo<ChildCardProps>(({ data, theme }) => {
  const customClasses = data.customClasses || '';
  const tooltipPosition = data.tooltip?.position || Position.Top;

  const tooltipElement = data.tooltip && (
    <div
      className={`
        absolute hidden group-hover:block z-50 px-2 py-1 text-sm rounded shadow-md
        whitespace-nowrap pointer-events-none
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border border-gray-200'}
        ${tooltipPositionStyles[tooltipPosition]}
      `}
    >
      {data.tooltip.label}
    </div>
  );

  switch (data.type) {
    case 'image':
      return (
        <div className={`relative rounded-lg overflow-hidden group ${customClasses}`}>
          <img src={data.imageUrl || "/api/placeholder/100/100"} alt={data.name} className="w-full h-24 object-cover" />
          <div className={`p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-semibold">{data.name}</div>
          </div>
          {tooltipElement}
          <Handle type="source" position={Position.Right} id={`${data.id}-right`} className="!bg-green-500" />
          <Handle type="target" position={Position.Left} id={`${data.id}-left`} className="!bg-green-500" />
        </div>
      );

    case 'icon':
      return (
        <div className={`relative flex items-center gap-2 rounded-lg border p-3 group ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${customClasses}`}>
          <User className="w-5 h-5" />
          <div>
            <div className="font-semibold">{data.name}</div>
            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Age: {data.age}</div>
          </div>
          {tooltipElement}
          <Handle type="source" position={Position.Right} id={`${data.id}-right`} className="!bg-green-500" />
          <Handle type="target" position={Position.Left} id={`${data.id}-left`} className="!bg-green-500" />
        </div>
      );

    default:
      return (
        <div
          className={`relative flex flex-col items-center rounded-lg border p-3 group ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${customClasses}`}
          style={{ fontSize: `${Math.max(0.875 * (data.scale || 1), 0.75)}rem` }}
        >
          <div className="font-semibold">{data.name}</div>
          <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Age: {data.age}</div>
          {tooltipElement}
          <Handle type="source" position={Position.Right} id={`${data.id}-right`} className="!bg-green-500" />
          <Handle type="target" position={Position.Left} id={`${data.id}-left`} className="!bg-green-500" />
        </div>
      );
  }
});
