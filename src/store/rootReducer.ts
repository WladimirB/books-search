import { combineReducers } from 'redux'
import { booksReducer } from './books/reducer'
import { snackbarReducer } from './snackbar/reducer'

const rootReducer = combineReducers({
  books: booksReducer,
  snackbar: snackbarReducer,
})

export default rootReducer
