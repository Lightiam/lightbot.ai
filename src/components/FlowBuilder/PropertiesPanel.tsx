import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { FlowNode, NodeType } from './types';

interface PropertiesPanelProps {
  selectedNode: FlowNode | null;
  onNodeUpdate: (node: FlowNode) => void;
}

export function PropertiesPanel({ selectedNode, onNodeUpdate }: PropertiesPanelProps) {
  const handleChange = useCallback((field: string, value: string) => {
    if (!selectedNode) return;
    
    onNodeUpdate({
      ...selectedNode,
      data: {
        ...selectedNode.data,
        [field]: value
      }
    });
  }, [selectedNode, onNodeUpdate]);

  if (!selectedNode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle data-testid="properties-title">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Select a node to edit its properties</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="properties-title">Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <p className="text-sm font-medium">{selectedNode.type}</p>
        </div>

        {selectedNode.type === NodeType.MESSAGE && (
          <div className="space-y-2">
            <Label htmlFor="message-input">Message</Label>
            <Textarea
              id="message-input"
              data-testid="message-input"
              aria-label="Message input"
              role="textbox"
              className="min-h-[100px] resize-none message-input"
              value={selectedNode.data.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Enter message text..."
              autoFocus
            />
          </div>
        )}

        {selectedNode.type === NodeType.INPUT && (
          <div className="space-y-2">
            <Label htmlFor="variable">Variable Name</Label>
            <Input
              id="variable"
              value={selectedNode.data.variable || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('variable', e.target.value)}
              placeholder="Enter variable name..."
            />
          </div>
        )}

        {selectedNode.type === NodeType.CONDITION && (
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              value={selectedNode.data.condition || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('condition', e.target.value)}
              placeholder="Enter condition..."
            />
          </div>
        )}

        {selectedNode.type === NodeType.API && (
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input
              id="endpoint"
              value={selectedNode.data.api_endpoint || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('api_endpoint', e.target.value)}
              placeholder="Enter API endpoint..."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
