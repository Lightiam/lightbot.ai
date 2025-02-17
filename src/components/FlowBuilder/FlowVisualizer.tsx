import { FC, useMemo, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge
} from 'reactflow';
import { useTheme } from '../providers/theme-provider';
import { CustomNode } from './CustomNode';
import { NodeData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart2, GitBranch, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'reactflow/dist/style.css';

const nodeTypes = {
  customNode: CustomNode,
};

interface FlowVisualizerProps {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export const FlowVisualizer: FC<FlowVisualizerProps> = ({ nodes, edges }) => {
  const { theme } = useTheme();
  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const stats = useMemo(() => {
    return {
      totalNodes: nodes.length,
      messageNodes: nodes.filter(n => n.type === 'message').length,
      inputNodes: nodes.filter(n => n.type === 'input').length,
      conditionNodes: nodes.filter(n => n.type === 'condition').length,
      totalConnections: edges.length,
      maxDepth: Math.max(...nodes.map(n => n.position.y)) / 100
    };
  }, [nodes, edges]);

  return (
    <Card className={cn("h-full")}>
      <CardHeader>
        <CardTitle className={cn("text-lg font-semibold")}>Flow Visualization</CardTitle>
      </CardHeader>
      <CardContent className={cn("p-0")}>
        <Tabs defaultValue="flow" className={cn("h-full")}>
          <TabsList className={cn("w-full justify-start rounded-none border-b px-6")}>
            <TabsTrigger value="flow" className={cn("gap-2")}>
              <GitBranch className={cn("h-4 w-4")} />
              Flow View
            </TabsTrigger>
            <TabsTrigger value="stats" className={cn("gap-2")}>
              <BarChart2 className={cn("h-4 w-4")} />
              Statistics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="h-[calc(100%-48px)]">
            <ReactFlow
              nodes={flowNodes}
              edges={flowEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-right"
            >
              <Background color={theme === 'dark' ? '#333' : '#eee'} />
              <Controls />
              <MiniMap 
                nodeColor={n => {
                  switch (n.type) {
                    case 'message':
                      return '#9333ea';
                    case 'input':
                      return '#3b82f6';
                    case 'condition':
                      return '#eab308';
                    default:
                      return '#64748b';
                  }
                }}
              />
            </ReactFlow>
          </TabsContent>
          
          <TabsContent value="stats" className="h-[calc(100%-48px)] p-6">
            <ScrollArea className="h-full">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="h-4 w-4" />
                      Total Nodes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.totalNodes}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <GitBranch className="h-4 w-4" />
                      Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.totalConnections}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <BarChart2 className="h-4 w-4" />
                      Max Depth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.maxDepth}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Node Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm">Messages</dt>
                        <dd className="text-sm font-medium">{stats.messageNodes}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">Inputs</dt>
                        <dd className="text-sm font-medium">{stats.inputNodes}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm">Conditions</dt>
                        <dd className="text-sm font-medium">{stats.conditionNodes}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
