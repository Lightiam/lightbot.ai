import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { NodeToolbar } from './NodeToolbar';
import { FlowCanvas } from './FlowCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { useState } from 'react';
import type { Connection, Edge } from 'reactflow';
import type { FlowNode } from './types';
import { NodeType } from './types';

export function FlowEditor() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  const handleNodeAdd = (type: NodeType, position: { x: number; y: number }) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      position,
      data: {}
    } as FlowNode;
    setNodes(prev => [...prev, newNode]);
  };

  const handleConnect = (params: Connection) => {
    setEdges(prev => [...prev, { ...params, id: `edge-${Date.now()}`, type: 'smoothstep' } as Edge]);
  };

  const handleNodeSelect = (node: FlowNode) => {
    setSelectedNode(node);
  };

  const handleNodeUpdate = (updatedNode: FlowNode) => {
    setNodes(prev => prev.map(node => node.id === updatedNode.id ? updatedNode : node));
  };

  return (
    <div className="grid grid-cols-[280px_1fr_280px] gap-4 h-[calc(100vh-8rem)]">
      <Card className="p-4 bg-card">
        <Tabs defaultValue="nodes" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="nodes">Nodes</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="nodes" className="mt-4">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <NodeToolbar onNodeAdd={handleNodeAdd} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="templates" className="mt-4">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="text-sm text-muted-foreground">
                Templates coming soon...
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card className="relative overflow-hidden bg-card">
        <FlowCanvas 
          nodes={nodes}
          edges={edges}
          onConnect={handleConnect}
          onNodeSelect={handleNodeSelect}
        />
      </Card>

      <Card className="p-4 bg-card">
        <PropertiesPanel 
          selectedNode={selectedNode}
          onNodeUpdate={handleNodeUpdate}
        />
      </Card>
    </div>
  );
}
