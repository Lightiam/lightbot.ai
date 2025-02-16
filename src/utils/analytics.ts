import { BotRequest } from '@botonic/core'

export const trackEvent = async (request: BotRequest, eventName: string, eventData: any = {}) => {
  try {
    const ga = request.plugins.googleAnalytics
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
