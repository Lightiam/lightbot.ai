import React from 'react'
import { Text } from '@botonic/react'

export default class Welcome extends React.Component {
  static async botonicInit() {
    return { name: 'Welcome' }
  }

  render() {
    return (
      <>
        <Text>Welcome to lightbot.ai! How can I assist you today?</Text>
      </>
    )
  }
}
