import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ChatProvider } from '../../lib/store/ChatContext';

const customRender = (ui: ReactElement) => {
  return render(
    <ChatProvider>
      {ui}
    </ChatProvider>
  );
};

export * from '@testing-library/react';
export { customRender as render };
