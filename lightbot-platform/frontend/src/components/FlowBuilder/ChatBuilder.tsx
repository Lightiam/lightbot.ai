import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { NodeType, FlowNode } from './types';
import { Connection, Edge } from 'reactflow';
import { FlowCanvas } from './FlowCanvas';
import { NodeToolbar } from './NodeToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { useTheme } from '../providers/theme-provider';
import { DEFAULT_LEAD_FLOW } from './types';

const defaultNodes: FlowNode[] = DEFAULT_LEAD_FLOW;

export function ChatBuilder() {
  const { theme } = useTheme();
  const [nodes, setNodes] = React.useState<FlowNode[]>(defaultNodes);
  const [edges, setEdges] = React.useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = React.useState<FlowNode | null>(null);

  const handleNodeAdd = React.useCallback((type: NodeType, position: { x: number; y: number }): void => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type,
      position,
      data: {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        message: type === NodeType.MESSAGE ? '' : undefined,
        variable: type === NodeType.INPUT ? '' : undefined,
        condition: type === NodeType.CONDITION ? '' : undefined,
        api_endpoint: type === NodeType.API ? '' : undefined,
      }
    };
    setNodes((nodes) => [...nodes, newNode]);
  }, []);

  const handleNodeSelect = React.useCallback((node: FlowNode): void => {
    setSelectedNode(node);
  }, []);

  const handleNodeUpdate = React.useCallback((updatedNode: FlowNode): void => {
    setNodes((nodes) => nodes.map(node => 
      node.id === updatedNode.id ? updatedNode : node
    ));
  }, []);

  const handleConnect = React.useCallback((params: Connection): void => {
    const newConnection = {
      ...params,
      id: `edge-${Date.now()}`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: theme === 'dark' ? '#9333ea' : '#a855f7', strokeWidth: 2 }
    } as Edge;
    setEdges((edges) => [...edges, newConnection]);
  }, [theme]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-[320px_1fr_320px] h-screen bg-background">
        <aside className="border-r border-border bg-card p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 text-foreground">Node Types</h2>
          <NodeToolbar onNodeAdd={handleNodeAdd} />
        </aside>
        <main className="bg-muted relative">
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodeSelect={handleNodeSelect}
            onConnect={handleConnect}
          />
        </main>
        <aside className="border-l border-border bg-card p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 text-foreground">Properties</h2>
          <PropertiesPanel
            selectedNode={selectedNode}
            onNodeUpdate={handleNodeUpdate}
          />
        </aside>
      </div>
    </DndProvider>
  );
}
