import * as hubtypeFlowBuilder from '@botonic/plugin-flow-builder'

const flowBuilderOptions = {
  apiUrl: 'HUBTYPE_FLOW_BUILDER_URL',
  jsonVersion: 'latest',
  getAccessToken: () => 'HUBTYPE_FLOW_BUILDER_ACCESS_TOKEN',
  getLocale: () => 'en',
}

export const plugins = [
  {
    id: 'hubtypeFlowBuilder',
    resolve: hubtypeFlowBuilder,
    options: flowBuilderOptions,
  },
  {
    id: 'googleAnalytics',
    resolve: require('@botonic/plugin-google-analytics'),
    options: {
      measurementId: process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
      apiSecret: process.env.GA_API_SECRET,
      getUserId: ({ session }) => session.user.id
    }
  }
]
