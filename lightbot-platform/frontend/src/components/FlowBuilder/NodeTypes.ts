export interface NodeData {
  label: string;
  type: keyof typeof NODE_TYPES;
  content?: string;
  variables?: Record<string, string>;
  conditions?: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
}

export const NODE_TYPES = {
  message: {
    label: 'Message',
    icon: 'MessageSquare',
    color: 'bg-blue-500',
  },
  input: {
    label: 'Input',
    icon: 'KeyboardIcon',
    color: 'bg-green-500',
  },
  condition: {
    label: 'Condition',
    icon: 'GitBranch',
    color: 'bg-yellow-500',
  },
  action: {
    label: 'Action',
    icon: 'Zap',
    color: 'bg-purple-500',
  },
} as const;
