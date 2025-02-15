import React from 'react'
import { WebchatHeader } from '@botonic/react'

export const CustomHeader: React.FC = () => (
  <WebchatHeader
    title="LightBot AI Assistant"
    subtitle="Powered by Botonic"
    style={{
      backgroundColor: '#2979ff',
      color: 'white',
    }}
  />
)
