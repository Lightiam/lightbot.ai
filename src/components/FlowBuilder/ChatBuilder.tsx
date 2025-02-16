import React, { useState, useCallback, type FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { FlowNode } from './types';
import { NodeType, DEFAULT_LEAD_FLOW } from './types';
import type { Connection, Edge, Node } from 'reactflow';
import { useFlowStore } from '../../lib/store/flowStore';
import { FlowCanvas } from './FlowCanvas';
import { NodeToolbar } from './NodeToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { useTheme } from '../providers/theme-provider';
import { Button } from '../ui/button';
import { StatusBadge } from '../ui/status-badge';
import { useFlowActions } from '../../hooks/use-flow-actions';
import 'reactflow/dist/style.css';

const defaultNodes: FlowNode[] = DEFAULT_LEAD_FLOW;

export function ChatBuilder() {
  const { theme } = useTheme();
  const [nodes, setNodes] = useState<FlowNode[]>(defaultNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const { isSaving, isDeploying, status } = useFlowStore();
  const { handleSave, handleDeploy } = useFlowActions();

  const handleNodeAdd = useCallback((type: NodeType, position: { x: number; y: number }) => {
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

  const handleNodeSelect = useCallback((node: FlowNode) => {
    setSelectedNode(node);
  }, []);

  const handleNodeUpdate = useCallback((updatedNode: FlowNode) => {
    setNodes((nodes) => nodes.map(node => 
      node.id === updatedNode.id ? updatedNode : node
    ));
  }, []);

  const handleConnect = useCallback((params: Connection) => {
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
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-foreground">Flow Builder</h2>
                <StatusBadge status={status} />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  variant="outline"
                  size="sm"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button 
                  onClick={handleDeploy}
                  disabled={isDeploying || status !== 'draft'}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  {isDeploying ? 'Deploying...' : 'Deploy'}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4 text-foreground">Node Types</h3>
              <NodeToolbar onNodeAdd={handleNodeAdd} />
            </div>
          </div>
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
