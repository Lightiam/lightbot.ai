import { BotonicInputTester, BotonicOutputTester } from '@botonic/react'
import { app } from '../../src'

const input = new BotonicInputTester(app)
const output = new BotonicOutputTester(app)

describe('Help Action', () => {
  test('returns help message', async () => {
    const response = await input.text('help')
    expect(response).toBe(output.text("Here's how I can help you:"))
  })
})
