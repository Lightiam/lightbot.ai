import React from 'react';
import { useToast } from './components/ui/use-toast';
import { ChatBuilder } from './components/FlowBuilder/ChatBuilder';
import { ThemeProvider } from './components/providers/theme-provider';
import { ThemeToggle } from './components/ui/theme-toggle';

export function App() {
  const { Toaster } = useToast();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600">Lightbot.ai Platform</h1>
            <ThemeToggle />
          </div>
        </header>
        <main>
          <ChatBuilder />
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
