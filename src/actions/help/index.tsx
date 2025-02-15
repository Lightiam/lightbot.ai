import React from 'react'
import { RequestContext, Text } from '@botonic/react'

export default class Help extends React.Component {
  static async botonicInit({ input, session }: RequestContext) {
    return { name: 'Help' }
  }

  render() {
    return (
      <>
        <Text>Here's how I can help you:</Text>
        <Text>
          - Ask questions about any topic
          - Get assistance with tasks
          - Navigate through options
          
          Type 'start over' to begin a new conversation.
        </Text>
      </>
    )
  }
}
