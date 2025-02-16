import { BotRequest } from '@botonic/core'

interface BotSession {
  user: {
    id: string;
    [key: string]: unknown;
  };
}

interface EventData {
  [key: string]: string | number | boolean;
}

interface GoogleAnalytics {
  track: (data: { 
    session: BotSession; 
    event: { 
      name: string; 
      params: EventData;
    } 
  }) => Promise<void>;
}

interface BotPlugins {
  googleAnalytics?: GoogleAnalytics;
}

type BotRequestWithPlugins = BotRequest & {
  plugins?: BotPlugins;
  session: BotSession;
}

export const trackEvent = async (request: BotRequestWithPlugins, eventName: string, eventData: EventData = {}) => {
  try {
    const ga = request.plugins?.googleAnalytics
    if (ga) {
      await ga.track({
        session: request.session,
        event: {
          name: eventName,
          params: eventData
        }
      })
    }
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}
