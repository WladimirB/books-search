import { Middleware, Store, applyMiddleware, legacy_createStore as createStore } from 'redux'
import rootReducer from './rootReducer'
import { AppAction, DispatchType } from './type'
import logger from './middleware/logger'
import { thunk } from 'redux-thunk'

export { default as selectors } from './selectors'

const store: Store<ReturnType<typeof rootReducer>, AppAction> & {
  dispatch: DispatchType
} = createStore(rootReducer, applyMiddleware<Middleware<any, any, any>>(thunk, logger))

export type RootState = ReturnType<typeof store.getState>

export default store
