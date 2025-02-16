import React from 'react'
// No Botonic import needed

export const CustomHeader: React.FC = () => (
  <div
    className="bg-[#2979ff] text-white p-4"
    aria-label="Chat Header"
    role="banner"
  >
    <h1 className="text-lg font-bold">LightBot AI Assistant</h1>
    <p className="text-sm">Powered by Botonic</p>
  </div>
)
