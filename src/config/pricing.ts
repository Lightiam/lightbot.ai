export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  limits: {
    messages: number;
    conversations: number;
    chatbots: number;
    agents: number;
  };
  features: string[];
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'baby',
    name: 'Baby Plan',
    price: {
      monthly: 0,
      yearly: 0
    },
    description: 'FREE Forever',
    limits: {
      messages: 1000,
      conversations: 100,
      chatbots: 1,
      agents: 0
    },
    features: [
      'Chatbot Platforms',
      'ChatGPT Integration',
      'Configure AI Bot personality',
      'AI Bot Training on Your Knowledge base',
      'Unlimited Subscriber/leads',
      'Pre-built Chat Flow Templates',
      'Unified Inbox',
      'Multi Languages',
      'Live Chat',
      'Reports & Analytics',
      'Videos & Help Tutorials',
      '2048-bit SSL secure connection'
    ]
  },
  {
    id: 'little',
    name: 'Little Plan',
    price: {
      monthly: 15,
      yearly: 150
    },
    description: 'For Growing Teams',
    limits: {
      messages: 3000,
      conversations: 3000,
      chatbots: 5,
      agents: 5
    },
    features: [
      'Everything in Baby Plan',
      'Lead Notification on Email',
      'Appointment Booking',
      'Customer Segmentation',
      'Custom Attributes & Tags',
      'Drip & Broadcast Campaigns',
      'Mobile Apps for agents',
      'Order/Shop Management',
      'CRM Integrations',
      'Ticketing System Integrations',
      'Woo-commerce Integration',
      'Shopify Integration',
      '30+ Integrations'
    ]
  },
  {
    id: 'king',
    name: 'King Plan',
    price: {
      monthly: 50,
      yearly: 500
    },
    description: 'Most Popular',
    limits: {
      messages: 12000,
      conversations: 12000,
      chatbots: -1, // Unlimited
      agents: 10
    },
    features: [
      'Everything in Little Plan',
      'MS Teams Chatbot Platform*',
      'ChatGPT AI Integration',
      'Assistant Model',
      'Configure AI Chatbot Training',
      'Your Knowledge base',
      'ChatGPT Knowledge Base',
      'Trigger Actions on Unusual AI Chat Scenarios',
      'Role-based Access Controls',
      'API Integration in Chatflows',
      'Zapier Integration',
      'Simplybook Integration',
      'Zoho Commerce Integration',
      '50+ Integrations'
    ],
    highlighted: true
  },
  {
    id: 'emperor',
    name: 'Emperor Plan',
    price: {
      monthly: -1, // Custom pricing
      yearly: -1  // Custom pricing
    },
    description: 'For Enterprise',
    limits: {
      messages: -1, // As per need
      conversations: -1, // As per need
      chatbots: -1, // Unlimited
      agents: -1  // Unlimited
    },
    features: [
      'Everything in King Plan',
      'Chatbot Platforms',
      'AI Bot Training on',
      'Customized As Per Your Need',
      'Advanced Analytics & Reporting',
      'Extensive Integrations',
      'Remove BotPenguin Branding',
      'Rule Based Chat Routing',
      'Custom Campaigns & Tracking',
      'FB E-commerce Integration',
      'We\'ll build it for you',
      'Advanced Security Modules',
      '80+ Integrations'
    ]
  }
];
  {
    id: 'little',
    name: 'Little Plan',
    price: {
      monthly: 15,
      yearly: 150
    },
    description: 'For Growing Teams',
    limits: {
      messages: 3000,
      conversations: 3000,
      chatbots: 5,
      agents: 5
    },
    features: [
      'Everything in Baby Plan',
      'Lead Notification on Email',
      'Appointment Booking',
      'Customer Segmentation',
      'Custom Attributes & Tags',
      'Drip & Broadcast Campaigns',
      'Mobile Apps for agents',
      'Order/Shop Management',
      'CRM Integrations',
      'Ticketing System Integrations',
      'Woo-commerce Integration',
      'Shopify Integration',
      '30+ Integrations'
    ]
  },
  {
    id: 'king',
    name: 'King Plan',
    price: {
      monthly: 50,
      yearly: 500
    },
    description: 'Most Popular',
    limits: {
      messages: 12000,
      conversations: 12000,
      chatbots: -1, // Unlimited
      agents: 10
    },
    features: [
      'Everything in Little Plan',
      'Advanced AI Training',
      'Custom Bot Development',
      'Priority Support',
      'Advanced Analytics',
      'Team Collaboration',
      'Custom Integrations',
      'Advanced Security Features',
      'Dedicated Account Manager',
      'SLA Support',
      'API Access',
      'White Label Options',
      '50+ Integrations'
    ],
    highlighted: true
  },
  {
    id: 'emperor',
    name: 'Emperor Plan',
    price: {
      monthly: -1, // Custom pricing
      yearly: -1  // Custom pricing
    },
    description: 'For Enterprise',
    limits: {
      messages: -1, // As per need
      conversations: -1, // As per need
      chatbots: -1, // Unlimited
      agents: -1  // Unlimited
    },
    features: [
      'Everything in King Plan',
      'Custom Development',
      'Enterprise Security',
      'Dedicated Support Team',
      'Custom SLA',
      'On-premise Deployment',
      'Custom AI Training',
      'Unlimited Storage',
      'Advanced Role Management',
      'Custom Analytics',
      'Custom Integrations',
      'Dedicated Infrastructure'
    ]
  }
];

export const PRICING_FEATURES = {
  chatbotPlatforms: ['Website', 'Facebook', 'WhatsApp', 'Instagram', 'Telegram', 'Line'],
  aiTraining: ['Documents', 'Websites', 'PDFs', 'Custom Data', 'APIs', 'Databases']
};

export const BILLING_INTERVALS = ['monthly', 'yearly'] as const;
export type BillingInterval = typeof BILLING_INTERVALS[number];

export function getAnnualDiscount(monthlyPrice: number): number {
  return monthlyPrice * 12 - monthlyPrice * 10; // 2 months free
}
