import { CustomHeader } from './components/CustomHeader'

export const config = {
  theme: {
    brandColor: '#2979ff',
    textPlaceholder: 'Type your message...',
    style: {
      width: '400px',
      height: '500px',
      margin: '20px',
    },
  },
  header: CustomHeader,
  persistentMenu: [
    { label: 'Start Over', payload: 'welcome' },
    { label: 'Help', payload: 'help' },
  ],
  enableAnimations: true,
  enableUserInput: true,
  enableAttachments: true,
}
