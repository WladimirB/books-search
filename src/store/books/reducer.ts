import { AppAction } from 'store/type'

import * as actionTypes from './action_types'

interface IBooksState {
  filter: {
    search: string
    category?: string
    order?: string
  }
  error?: Error | null
  isLoading: boolean
  items: Array<any>
  page: number
}

const initialState = {
  filter: {
    search: '',
    category: 'all',
    order: 'newest',
  },
  error: null,
  isLoading: true,
  items: [],
  page: 1,
}

export const booksReducer = (state = initialState, action: AppAction<any>): IBooksState => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER:
      return { ...state, filter: action.payload, items: [] }
    case actionTypes.LOADING:
      return { ...state, isLoading: true }
    case actionTypes.LOADED_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case actionTypes.LOADED_SUCCESS:
      return { ...state, isLoading: false, error: null, items: [...state.items, action.payload] }
    case actionTypes.NEXT_PAGE:
      return { ...state, page: state.page + 1 }
    default:
      return state
  }
}
