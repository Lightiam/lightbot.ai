import { BotonicInputTester, BotonicOutputTester } from '@botonic/react'
import { app } from '../../src'

const input = new BotonicInputTester(app)
const output = new BotonicOutputTester(app)

describe('Welcome Action', () => {
  test('returns greeting message', async () => {
    const response = await input.text('hi')
    expect(response).toBe(output.text('Welcome to lightbot.ai! How can I assist you today?'))
  })
})
