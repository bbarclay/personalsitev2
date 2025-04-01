import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface CustomNodeData {
  emoji: string;
  label: string;
  subline: string;
}

function CustomNode({ data }: { data: CustomNodeData }) {
  return (
    <div className="rounded-2xl shadow-sm dark:shadow-slate-700 bg-white dark:bg-slate-800"
      style={{
        padding: '24px',
        width: '320px',
        position: 'relative'
      }}>
      <div className="flex gap-6">
        <div className="rounded-full w-16 h-16 flex items-center justify-center bg-gray-50 dark:bg-slate-700">
          {data.emoji}
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{data.label}</div>
          <div className="text-lg text-gray-500 dark:text-gray-400">{data.subline}</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-teal-500"
      />
    </div>
  );
}

export default memo(CustomNode);
