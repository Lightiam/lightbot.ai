import { DecisionNode } from './types';

export const chatDecisionTree: DecisionNode = {
  id: 'root',
  message: 'How can I help you today?',
  children: [
    {
      id: 'support',
      message: 'Do you need technical support?',
      children: [
        {
          id: 'technical',
          message: 'What technical issue are you experiencing?',
          children: []
        },
        {
          id: 'general',
          message: 'How can we assist you today?',
          children: []
        }
      ]
    },
    {
      id: 'information',
      message: 'Would you like to learn more about our services?',
      children: [
        {
          id: 'features',
          message: 'Let me tell you about our key features.',
          children: []
        },
        {
          id: 'pricing',
          message: 'Would you like to know about our pricing plans?',
          children: []
        }
      ]
    }
  ]
};

export const routeMessage = (message: string, currentState: string): DecisionNode => {
  const findNode = (nodeId: string, tree: DecisionNode): DecisionNode | null => {
    if (tree.id === nodeId) return tree;
    for (const child of tree.children) {
      const found = findNode(nodeId, child);
      if (found) return found;
    }
    return null;
  };

  const currentNode = findNode(currentState, chatDecisionTree) || chatDecisionTree;
  
  // Simple keyword-based routing
  const keywords = {
    support: ['help', 'support', 'issue', 'problem', 'trouble'],
    technical: ['error', 'bug', 'broken', 'not working'],
    information: ['info', 'learn', 'about', 'what'],
    features: ['feature', 'capability', 'can do'],
    pricing: ['price', 'cost', 'plan', 'subscription']
  };

  for (const [nodeId, words] of Object.entries(keywords)) {
    if (words.some(word => message.toLowerCase().includes(word))) {
      const targetNode = findNode(nodeId, chatDecisionTree);
      if (targetNode) return targetNode;
    }
  }

  return currentNode.children[0] || currentNode;
};
