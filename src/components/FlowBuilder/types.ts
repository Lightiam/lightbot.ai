import type { Node } from 'reactflow';

export enum NodeType {
  START = 'start',
  MESSAGE = 'message',
  INPUT = 'input',
  CONDITION = 'condition',
  API = 'api',
  END = 'end'
}

export interface FlowNode extends Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label?: string;
    message?: string;
    variable?: string;
    condition?: string;
    api_endpoint?: string;
    required?: boolean;
    options?: string[];
    [key: string]: any;
  };
}

export const DEFAULT_LEAD_FLOW: FlowNode[] = [
  {
    id: 'start',
    type: NodeType.START,
    position: { x: 100, y: 100 },
    data: {
      label: 'Welcome',
      message: 'Hi there! Welcome! Tell us what you\'re looking for today.'
    }
  },
  {
    id: 'name-input',
    type: NodeType.INPUT,
    position: { x: 100, y: 200 },
    data: {
      label: 'Name Input',
      variable: 'name',
      message: 'What\'s your name?',
      required: true
    }
  },
  {
    id: 'email-input',
    type: NodeType.INPUT,
    position: { x: 100, y: 300 },
    data: {
      label: 'Email Input',
      variable: 'email',
      message: 'What\'s your email address?',
      required: true
    }
  },
  {
    id: 'phone-input',
    type: NodeType.INPUT,
    position: { x: 100, y: 400 },
    data: {
      label: 'Phone Input',
      variable: 'phone',
      message: 'And your phone number, if you\'d like to provide it? (Optional)',
      required: false
    }
  },
  {
    id: 'needs-input',
    type: NodeType.INPUT,
    position: { x: 100, y: 500 },
    data: {
      label: 'Needs Input',
      variable: 'needs',
      message: 'Briefly tell us what you\'re interested in or what your needs are.',
      required: true
    }
  },
  {
    id: 'confirmation',
    type: NodeType.MESSAGE,
    position: { x: 100, y: 600 },
    data: {
      label: 'Confirmation',
      message: 'Thank you! We\'ve received your information. We\'ll be in touch soon to discuss your needs.'
    }
  },
  {
    id: 'store-data',
    type: NodeType.API,
    position: { x: 100, y: 700 },
    data: {
      label: 'Store Lead Data',
      api_endpoint: '/api/leads'
    }
  },
  {
    id: 'end',
    type: NodeType.END,
    position: { x: 100, y: 800 },
    data: {
      label: 'End Flow'
    }
  }
];
