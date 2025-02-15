import { render, screen, fireEvent } from '../../test/utils/test-utils';
import { ChatContainer } from './ChatContainer';

// Mock fetch
global.fetch = vi.fn();

describe('ChatContainer', () => {
  beforeEach(() => {
    render(<ChatContainer />);
  });

  it('renders chat interface', () => {
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
  });

  it('handles user input', () => {
    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input).toHaveValue('Hello');
  });
});
