import React from 'react'
import { Text } from '@botonic/react'

export default class Help extends React.Component {
  static async botonicInit() {
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
