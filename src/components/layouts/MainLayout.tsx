import React from 'react';
import { Link } from '../ui/link';
import { Button } from '../ui/button';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-purple-600">LightbotAI</Link>
          <div className="flex items-center gap-8">
            <Link to="/features" className="text-foreground hover:text-purple-600">Features</Link>
            <Link to="/documentation" className="text-foreground hover:text-purple-600">Documentation</Link>
            <Link to="/pricing" className="text-foreground hover:text-purple-600">Pricing</Link>
            <Button asChild variant="default" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-purple-600 mb-4">LightbotAI</h3>
              <p className="text-muted-foreground">
                Building the future of conversational AI. Create intelligent chatbots that understand context and deliver natural conversations.
              </p>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-muted-foreground hover:text-purple-600">Features</Link></li>
                <li><Link to="/documentation" className="text-muted-foreground hover:text-purple-600">Documentation</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-purple-600">Pricing</Link></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-purple-600">About</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-purple-600">Blog</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-purple-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            © 2025 LightbotAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
