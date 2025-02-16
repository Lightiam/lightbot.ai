import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData, NODE_TYPES } from './NodeTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, KeyboardIcon, GitBranch, Zap } from 'lucide-react';

const Icons = {
  MessageSquare,
  KeyboardIcon,
  GitBranch,
  Zap,
};

export const CustomNode = memo(({ data, isConnectable }: NodeProps<NodeData>) => {
  const nodeType = NODE_TYPES[data.type];
  const Icon = Icons[nodeType.icon as keyof typeof Icons];

  return (
    <Card className="min-w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <CardHeader className={`${nodeType.color} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {data.type === 'message' && <p>{data.content}</p>}
        {data.type === 'input' && (
          <div className="flex flex-col gap-2">
            {Object.entries(data.variables || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}
        {data.type === 'condition' && (
          <div className="flex flex-col gap-2">
            {data.conditions?.map((condition, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{condition.field}</span>
                <span>{condition.operator}</span>
                <span>{condition.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Card>
  );
});

CustomNode.displayName = 'CustomNode';
