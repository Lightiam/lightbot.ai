import React from 'react'
import { Text } from '@botonic/react'

export default class ErrorAction extends React.Component {
  static async botonicInit({ input }: { input: { error: string } }) {
    return { error: input.error }
  }

  render() {
    return (
      <>
        <Text>I apologize, but I encountered an error. Please try again or ask for help.</Text>
        <Text>You can type "help" for assistance or try rephrasing your request.</Text>
      </>
    )
  }
}
