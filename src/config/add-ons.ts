import type { AddOnPricing } from '../types/pricing';

export const ADD_ON_PRICING: AddOnPricing[] = [
  {
    id: 'additional-agents',
    name: 'Additional Agents',
    price: {
      monthly: 7,
      yearly: 70
    }
  },
  {
    id: 'data-training-storage',
    name: 'Data training storage - 1GB',
    price: {
      monthly: 15,
      yearly: 150
    }
  },
  {
    id: 'whitelabel-chat',
    name: 'Whitelabel Chat Window (per bot)',
    price: {
      monthly: 20,
      yearly: 200
    }
  },
  {
    id: 'ms-teams',
    name: 'MS Teams Platform',
    price: {
      monthly: 100,
      yearly: 1000
    }
  }
];

export const MESSAGE_PACKS = [
  {
    id: 'messages-1k',
    name: 'Pack of 1,000 messages',
    price: {
      monthly: 5,
      yearly: 50
    }
  },
  {
    id: 'messages-5k',
    name: 'Pack of 5,000 messages',
    price: {
      monthly: 10,
      yearly: 100
    }
  },
  {
    id: 'messages-10k',
    name: 'Pack of 10,000 messages',
    price: {
      monthly: 15,
      yearly: 150
    }
  },
  {
    id: 'messages-100k',
    name: 'Pack of 100,000 messages',
    price: {
      monthly: 120,
      yearly: 1200
    }
  }
];

export const CONVERSATION_PACKS = [
  {
    id: 'conversations-1k',
    name: 'Pack of 1,000 conversations',
    price: {
      monthly: 5,
      yearly: 50
    }
  },
  {
    id: 'conversations-5k',
    name: 'Pack of 5,000 conversations',
    price: {
      monthly: 15,
      yearly: 150
    }
  },
  {
    id: 'conversations-10k',
    name: 'Pack of 10,000 conversations',
    price: {
      monthly: 20,
      yearly: 200
    }
  },
  {
    id: 'conversations-100k',
    name: 'Pack of 100,000 conversations',
    price: {
      monthly: 180,
      yearly: 1800
    }
  }
];
