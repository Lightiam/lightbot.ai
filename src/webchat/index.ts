import { CustomHeader } from './components/CustomHeader'

export const config = {
  theme: {
    brandColor: '#2979ff',
    textPlaceholder: 'Type your message...',
    style: {
      width: '400px',
      height: '500px',
    },
    enableAnimations: false, // Disable animations for better performance
  },
  header: CustomHeader,
  persistentMenu: {
    closeLabel: 'Close Menu',
    persistent: false, // Load menu on demand
    items: [
      { label: 'Start Over', payload: 'welcome', 'aria-label': 'Start conversation over' },
      { label: 'Help', payload: 'help', 'aria-label': 'Get help with using the chat' },
    ]
  },
  enableUserInput: true,
  enableAttachments: false, // Disable attachments for better performance
  accessibility: {
    role: 'complementary',
    ariaLabel: 'Chat with LightBot AI Assistant',
    messages: {
      newMessageAlert: 'New message received',
      sendButtonLabel: 'Send message',
      inputPlaceholder: 'Type your message here',
    }
  }
}
