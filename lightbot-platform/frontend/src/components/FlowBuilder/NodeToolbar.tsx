import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, KeyboardIcon, GitBranch, Zap, AlertCircle } from 'lucide-react';
import { NodeType } from './types';

const NODE_TYPES = [
  { type: NodeType.MESSAGE, label: 'Message', icon: MessageSquare, color: 'text-purple-500' },
  { type: NodeType.INPUT, label: 'User Input', icon: KeyboardIcon, color: 'text-blue-500' },
  { type: NodeType.CONDITION, label: 'Condition', icon: GitBranch, color: 'text-amber-500' },
  { type: NodeType.API, label: 'API Call', icon: Zap, color: 'text-green-500' },
  { type: NodeType.END, label: 'End', icon: AlertCircle, color: 'text-red-500' },
];

export function NodeToolbar() {
  return (
    <div className="space-y-2 p-4">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Node Types</h2>
      {NODE_TYPES.map(({ type, label, icon: Icon, color }) => (
        <Card 
          key={type} 
          className="p-2 cursor-move hover:bg-accent transition-colors duration-200 border border-border"
        >
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm hover:bg-transparent"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('nodeType', type);
            }}
          >
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-foreground">{label}</span>
          </Button>
        </Card>
      ))}
    </div>
  );
}
