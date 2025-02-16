import { Suspense } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  NodeProps,
  Position,
  Handle,
  Connection,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useTheme } from '../providers/theme-provider';
import { FlowNode, NodeType } from './types';

interface FlowCanvasProps {
  nodes: FlowNode[];
  edges: Edge[];
  onConnect: (params: Connection) => void;
  onNodeSelect: (node: FlowNode) => void;
}

const MessageNode = ({ data }: NodeProps) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <div className="p-4 min-w-[200px] bg-purple-50 dark:bg-purple-900 border-2 border-purple-200 dark:border-purple-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-purple-900 dark:text-purple-100">{data.label}</div>
      <div className="mt-2 text-xs text-purple-600 dark:text-purple-300">{data.message}</div>
    </div>
  </div>
);

const InputNode = ({ data }: NodeProps) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <div className="p-4 min-w-[200px] bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-blue-900 dark:text-blue-100">{data.label}</div>
      <div className="mt-2 text-xs text-blue-600 dark:text-blue-300">
        {data.message}
        {data.required && <span className="text-red-500 ml-1">*</span>}
      </div>
    </div>
  </div>
);

const ConditionNode = ({ data }: NodeProps) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <Handle type="source" position={Position.Right} id="true" />
    <Handle type="source" position={Position.Left} id="false" />
    <div className="p-4 min-w-[200px] bg-amber-50 dark:bg-amber-900 border-2 border-amber-200 dark:border-amber-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-amber-900 dark:text-amber-100">{data.label}</div>
      <div className="mt-2 text-xs text-amber-600 dark:text-amber-300">{data.condition}</div>
    </div>
  </div>
);

const ApiNode = ({ data }: NodeProps) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <div className="p-4 min-w-[200px] bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-green-900 dark:text-green-100">{data.label}</div>
      <div className="mt-2 text-xs text-green-600 dark:text-green-300">{data.api_endpoint}</div>
    </div>
  </div>
);

const EndNode = ({ data }: NodeProps) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <div className="p-4 min-w-[200px] bg-red-50 dark:bg-red-900 border-2 border-red-200 dark:border-red-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-red-900 dark:text-red-100">{data.label}</div>
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  [NodeType.MESSAGE]: MessageNode,
  [NodeType.INPUT]: InputNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.API]: ApiNode,
  [NodeType.END]: EndNode,
};

export const FlowCanvas = ({ nodes, edges, onConnect, onNodeSelect }: FlowCanvasProps) => {
  const { theme } = useTheme();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="w-full h-full bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodeClick={(_, node) => onNodeSelect(node as FlowNode)}
          nodeTypes={nodeTypes}
          fitView
          className="transition-all duration-200"
          defaultEdgeOptions={{
            style: { stroke: theme === 'dark' ? '#9333ea' : '#a855f7', strokeWidth: 2 },
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background color={theme === 'dark' ? '#581c87' : '#e9d5ff'} gap={16} size={1} />
          <Controls className="bg-card border border-border shadow-sm" />
          <MiniMap
            className="bg-card border border-border shadow-sm"
            nodeColor={(node) => {
              switch (node.type) {
                case NodeType.MESSAGE:
                  return '#f3e8ff';
                case NodeType.INPUT:
                  return '#e0f2fe';
                case NodeType.CONDITION:
                  return '#fef3c7';
                case NodeType.API:
                  return '#dcfce7';
                case NodeType.END:
                  return '#fee2e2';
                default:
                  return '#f3f4f6';
              }
            }}
          />
        </ReactFlow>
      </div>
    </Suspense>
  );
};
