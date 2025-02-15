import { render, screen, fireEvent } from '@testing-library/react';
import { ChatErrorBoundary } from './ChatErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ChatErrorBoundary', () => {
  it('renders error UI when error occurs', () => {
    render(
      <ChatErrorBoundary>
        <ErrorComponent />
      </ChatErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('resets on try again click', () => {
    const { container } = render(
      <ChatErrorBoundary>
        <ErrorComponent />
      </ChatErrorBoundary>
    );

    const tryAgainButton = screen.getByText('Try Again');
    fireEvent.click(tryAgainButton);

    expect(container).toMatchSnapshot();
  });
});
