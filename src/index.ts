import { getBotonicApp } from '@botonic/react'
import { routes } from './routes'
import { plugins } from './plugins'

const app = getBotonicApp()
app.configure({ routes, plugins })
export { app }
