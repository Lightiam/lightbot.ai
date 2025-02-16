import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useChat } from '../../lib/store/ChatContext';
import { routeMessage } from '../../lib/router/ChatRouter';
import { config } from '../../config';

export const ChatContainer = () => {
  const { state, dispatch } = useChat();
  const [input, setInput] = useState('');

  const handleMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage = {
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      state: state.currentState
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInput('');

    const nextNode = routeMessage(content, state.currentState);
    dispatch({ type: 'SET_STATE', payload: nextNode.id });

    try {
      const response = await fetch(`${config.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const botResponse = await response.json();
      dispatch({ type: 'ADD_MESSAGE', payload: botResponse });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to send message. Please try again.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] p-4 border rounded-lg mb-4">
            {state.messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {state.error && (
              <div className="text-center text-red-500 my-2">
                {state.error}
              </div>
            )}
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMessage(input)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={() => handleMessage(input)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
