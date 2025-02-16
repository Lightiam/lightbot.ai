import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useToast } from './components/ui/use-toast';
import { ChatBuilder } from './components/FlowBuilder/ChatBuilder';
import { PricingPage } from './pages/pricing';
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
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium hover:text-purple-600">Builder</Link>
              <Link to="/pricing" className="text-sm font-medium hover:text-purple-600">Pricing</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <Router>
          <main>
            <Routes>
              <Route path="/" element={<ChatBuilder />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/success" element={<div className="container mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold">Subscription successful!</h1></div>} />
              <Route path="/cancel" element={<div className="container mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold">Subscription cancelled.</h1></div>} />
            </Routes>
          </main>
        </Router>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
