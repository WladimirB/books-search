import { Store, legacy_createStore as createStore } from 'redux'
import rootReducer from './rootReducer'
import { AppAction, DispatchType } from './type'

const store: Store<ReturnType<typeof rootReducer>, AppAction> & {
  dispatch: DispatchType
} = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export default store
