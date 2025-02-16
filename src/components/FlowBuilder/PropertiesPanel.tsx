import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FlowNode, NodeType } from './types';

interface PropertiesPanelProps {
  selectedNode: FlowNode | null;
  onNodeUpdate: (node: FlowNode) => void;
}

export function PropertiesPanel({ selectedNode, onNodeUpdate }: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Select a node to edit its properties</p>
        </CardContent>
      </Card>
    );
  }

  const handleChange = (field: string, value: string) => {
    onNodeUpdate({
      ...selectedNode,
      data: {
        ...selectedNode.data,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <p className="text-sm font-medium">{selectedNode.type}</p>
        </div>

        {selectedNode.type === NodeType.MESSAGE && (
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={selectedNode.data.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Enter message text..."
              className="min-h-[100px]"
            />
          </div>
        )}

        {selectedNode.type === NodeType.INPUT && (
          <div className="space-y-2">
            <Label htmlFor="variable">Variable Name</Label>
            <Input
              id="variable"
              value={selectedNode.data.variable || ''}
              onChange={(e) => handleChange('variable', e.target.value)}
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
              onChange={(e) => handleChange('condition', e.target.value)}
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
              onChange={(e) => handleChange('api_endpoint', e.target.value)}
              placeholder="Enter API endpoint..."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
