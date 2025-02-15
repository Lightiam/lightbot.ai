import React from 'react'
import { RequestContext, Text } from '@botonic/react'

export default class ErrorAction extends React.Component {
  static async botonicInit({ input, session }: RequestContext) {
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
