import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { IconCardNode } from './IconCardNode';

interface ChildNode {
  id: string;
  type: string;
  name?: string;
  handles?: string[];
  data?: any;
}

interface FamilyData {
  theme?: 'dark' | 'light';
  customClasses?: string;
  familyName: string;
  layout?: {
    columns: number;
  };
  children: ChildNode[];
}

interface FamilyNodeProps {
  data: FamilyData;
}

export const FamilyNode = memo(({ data }: FamilyNodeProps) => {
  const theme = data.theme || 'dark';
  const customClasses = data.customClasses || '';

  const getConnectorHandles = (child: ChildNode, index: number) => {
    const handles = [];
    if (child.handles?.includes('top')) {
      handles.push(<Handle key={`${child.id}-top`} type="source" position={Position.Top} id={`${child.id}-top`} className="!bg-blue-500" />);
    }
    if (child.handles?.includes('bottom')) {
      handles.push(<Handle key={`${child.id}-bottom`} type="source" position={Position.Bottom} id={`${child.id}-bottom`} className="!bg-blue-500" />);
    }
    if (child.handles?.includes('left')) {
      handles.push(<Handle key={`${child.id}-left`} type="source" position={Position.Left} id={`${child.id}-left`} className="!bg-blue-500" />);
    }
    if (child.handles?.includes('right')) {
      handles.push(<Handle key={`${child.id}-right`} type="source" position={Position.Right} id={`${child.id}-right`} className="!bg-blue-500" />);
    }
    return handles;
  };

  const renderChild = (child: ChildNode) => {
    const childContent = (
      <div className="p-[10px] relative" id={child.id}>
        {(() => {
          switch (child.type) {
            case 'iconCard':
              return <IconCardNode id={child.id} data={{ ...child.data, nodeId: child.id }} />;
            case 'tooltip':
              return (
                <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`} id={child.id}>
                  {child.name}
                </div>
              );
            default:
              return (
                <div className="p-2" id={child.id}>
                  {child.name || 'Unnamed'}
                </div>
              );
          }
        })()}
        <Handle
          type="source"
          position={Position.Bottom}
          id={`${child.id}-source`}
          className="!bg-blue-500"
          style={{ bottom: 0 }}
        />
      </div>
    );

    return childContent;
  };

  return (

    <div className={`flex flex-col items-center rounded-xl shadow-lg p-4 border-2 ${theme === 'dark' ? 'bg-gray-800 border-blue-600 text-white' : 'bg-white border-blue-500'} ${customClasses}`}>
      <div className="text-xl font-bold mb-4">{data.familyName}</div>
      <div className={`w-full border-2 rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Children</div>
        <div className={`grid grid-cols-${data.layout?.columns || 2} gap-4 w-full`}>
          {data.children.map((child) => (
            <div key={child.id}>
              {renderChild(child)}
            </div>
          ))}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  );
});
