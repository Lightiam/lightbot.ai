export interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  currentState: string;
  error: string | null;
}

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_STATE'; payload: string }
  | { type: 'SET_ERROR'; payload: string };
