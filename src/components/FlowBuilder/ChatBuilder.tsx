import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { FlowNode } from './types';
import { NodeType } from './types';
import type { Connection, Edge } from 'reactflow';
import { useFlowStore } from '../../lib/store/flowStore';

// Remove unused defaultNodes
// const defaultNodes: FlowNode[] = DEFAULT_LEAD_FLOW;
import { FlowCanvas } from './FlowCanvas';
import { NodeToolbar } from './NodeToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { useTheme } from '../providers/theme-provider';
import { Button } from '../ui/button';
import { StatusBadge } from '../ui/status-badge';
import { useFlowActions } from '../../hooks/use-flow-actions';
import { BarChart2 } from 'lucide-react';
import { FlowVisualizer } from './FlowVisualizer';
import 'reactflow/dist/style.css';

export function ChatBuilder() {
  const { theme } = useTheme();
  const { nodes, edges, selectedNode, isSaving, isDeploying, status, setEdges, setSelectedNode, addNode, updateNode } = useFlowStore();
  const { handleSave, handleDeploy } = useFlowActions();
  const [view, setView] = useState<'edit' | 'preview' | 'visualize'>('edit');

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
    addNode(newNode);
    setSelectedNode(newNode);
  }, [addNode, setSelectedNode]);

  const handleNodeSelect = useCallback((node: FlowNode) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const handleNodeUpdate = useCallback((updatedNode: FlowNode) => {
    const { id, data } = updatedNode;
    updateNode(id, data);
  }, [updateNode]);

  const handleConnect = useCallback((params: Connection) => {
    const newConnection = {
      ...params,
      id: `edge-${Date.now()}`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: theme === 'dark' ? '#9333ea' : '#a855f7', strokeWidth: 2 }
    } as Edge;
    setEdges((edges) => [...edges, newConnection]);
  }, [theme, setEdges]);

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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setView('visualize')}
                  >
                    <BarChart2 className="h-4 w-4 mr-1" />
                    Visualize
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving}
                    variant="outline"
                    size="sm"
                    data-testid="save-button"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button 
                    onClick={handleDeploy}
                    disabled={isDeploying || status !== 'draft'}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="sm"
                    data-testid="deploy-button"
                  >
                    {isDeploying ? 'Deploying...' : 'Deploy'}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4 text-foreground">Available Nodes</h3>
              <NodeToolbar onNodeAdd={handleNodeAdd} />
            </div>
          </div>
        </aside>
        <main className="bg-muted relative">
          {view === 'edit' ? (
            <FlowCanvas
              nodes={nodes}
              edges={edges}
              onNodeSelect={handleNodeSelect}
              onConnect={handleConnect}
            />
          ) : view === 'visualize' ? (
            <FlowVisualizer nodes={nodes} edges={edges} />
          ) : null}
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
