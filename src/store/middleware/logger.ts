/* eslint-disable no-console */
import { Dispatch, MiddlewareAPI, Action } from 'redux'
const logger =
  ({ getState }: MiddlewareAPI<Dispatch<Action>>) =>
  (next: Dispatch<Action<any>>) =>
  (action: Action<any>) => {
    console.group(action.type)
    console.info('dispatching', action)
    const result = next(action)
    console.log('next state', getState())
    console.groupEnd()
    return result
  }

export default logger
