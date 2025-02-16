import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NodeToolbar } from './NodeToolbar';
import { FlowCanvas } from './FlowCanvas';
import { PropertiesPanel } from './PropertiesPanel';

export function FlowEditor() {
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
              <NodeToolbar />
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
        <FlowCanvas />
      </Card>

      <Card className="p-4 bg-card">
        <PropertiesPanel />
      </Card>
    </div>
  );
}
