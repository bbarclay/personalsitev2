import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IconCardData {
  theme?: 'dark' | 'light';
  customClasses?: string;
  icon?: { type: keyof typeof LucideIcons; props?: { className?: string } } | string;
  iconName?: string;
  iconSize?: number;
  iconClassName?: string;
  title: string;
  description: string;
  nodeId?: string;
}

interface IconCardProps {
  data: IconCardData;
  id: string;
}

export const IconCardNode = memo(({ data, id }: IconCardProps) => {
  const theme = data.theme || 'dark';
  const customClasses = data.customClasses || '';

  const getIconComponent = () => {
    try {
      const iconType = typeof data.icon === 'object' ? data.icon.type : data.iconName;
      return iconType ? (LucideIcons[iconType as keyof typeof LucideIcons] ?? LucideIcons.HelpCircle) : LucideIcons.HelpCircle;
    } catch {
      return LucideIcons.HelpCircle;
    }
  };

  const IconComponent = getIconComponent() as React.ElementType;
  const iconSize = data.iconSize || 24;
  const iconColor = theme === 'dark' ? '#e5e7eb' : '#374151';
  const iconClassName = typeof data.icon === 'object' ? data.icon.props?.className : data.iconClassName;

  return (
    <div className={`
      rounded-xl shadow-lg border border-white/20
      transition-all duration-300 hover:scale-105
      hover:shadow-xl hover:shadow-blue-500/20
      bg-gradient-to-br from-slate-800 to-slate-900
      max-w-[250px] transform-gpu
      ${customClasses}
    `} id={id}>
      <div className="p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm
               transform transition-transform duration-300 hover:rotate-3">
            <IconComponent
              size={iconSize}
              color={iconColor}
              className={`${iconClassName} animate-pulse`}
            />
          </div>
          <h3 className="font-bold text-sm">{data.title}</h3>
        </div>
        <p className="text-xs text-gray-300/80">
          {data.description}
        </p>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id={`${data.nodeId || id}-target`}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${data.nodeId || id}-source`}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
});

IconCardNode.displayName = 'IconCardNode';
