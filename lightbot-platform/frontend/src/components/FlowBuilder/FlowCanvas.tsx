import React, { Suspense, ComponentType, memo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  NodeTypes,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useTheme } from '@/components/providers/theme-provider';
import { FlowNode, NodeType } from './types';

interface FlowCanvasProps {
  nodes: FlowNode[];
  edges: Edge[];
  onConnect: (params: Connection | Edge) => void;
  onNodeSelect: (node: FlowNode) => void;
}

const MessageNode: ComponentType<NodeProps> = memo(({ data }) => (
    <div className="p-4 min-w-[200px] bg-purple-50 dark:bg-purple-900 border-2 border-purple-200 dark:border-purple-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-purple-900 dark:text-purple-100">{data.label}</div>
      <div className="mt-2 text-xs text-purple-600 dark:text-purple-300">{data.message}</div>
    </div>
));

const InputNode: ComponentType<NodeProps> = memo(({ data }) => (
    <div className="p-4 min-w-[200px] bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-blue-900 dark:text-blue-100">{data.label}</div>
      <div className="mt-2 text-xs text-blue-600 dark:text-blue-300">{data.variable}</div>
    </div>
));

const ConditionNode: ComponentType<NodeProps> = memo(({ data }) => (
    <div className="p-4 min-w-[200px] bg-amber-50 dark:bg-amber-900 border-2 border-amber-200 dark:border-amber-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-amber-900 dark:text-amber-100">{data.label}</div>
      <div className="mt-2 text-xs text-amber-600 dark:text-amber-300">{data.condition}</div>
    </div>
));

const ApiNode: ComponentType<NodeProps> = memo(({ data }) => (
    <div className="p-4 min-w-[200px] bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-green-900 dark:text-green-100">{data.label}</div>
      <div className="mt-2 text-xs text-green-600 dark:text-green-300">{data.api_endpoint}</div>
    </div>
));

const EndNode: ComponentType<NodeProps> = memo(({ data }) => (
    <div className="p-4 min-w-[200px] bg-red-50 dark:bg-red-900 border-2 border-red-200 dark:border-red-700 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-red-900 dark:text-red-100">{data.label}</div>
    </div>
));

const nodeTypes: NodeTypes = {
  [NodeType.MESSAGE]: MessageNode,
  [NodeType.INPUT]: InputNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.API]: ApiNode,
  [NodeType.END]: EndNode,
};

export function FlowCanvas({ nodes, edges, onConnect, onNodeSelect }: FlowCanvasProps) {
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
            style: { stroke: '#9333ea', strokeWidth: 2 },
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
                case 'message':
                  return '#f3e8ff';
                case 'input':
                  return '#e0f2fe';
                case 'condition':
                  return '#fef3c7';
                default:
                  return '#f3f4f6';
              }
            }}
          />
        </ReactFlow>
      </div>
    </Suspense>
  );
}
