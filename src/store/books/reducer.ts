import { AppAction } from 'store/type'

import * as actionTypes from './action_types'
import { IBookModel } from 'data/models/booksModel'
import { TOrder } from 'data'

export interface IBooksState {
  filter: {
    search: string
    category: string
    order: TOrder
  }
  error?: Error | null
  isLoading: boolean
  items: IBookModel[]
  page: number
  totalCount: number | null
}

const initialState = {
  filter: {
    search: '',
    category: 'all',
    order: 'newest' as TOrder,
  },
  error: null,
  isLoading: false,
  items: [],
  page: 1,
  totalCount: null,
}

export const booksReducer = (
  state: IBooksState = initialState,
  action: AppAction<any>,
): IBooksState => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER:
      return { ...state, filter: action.payload, items: [], page: 1, totalCount: null }
    case actionTypes.LOADING:
      return { ...state, isLoading: true }
    case actionTypes.LOADED_ERROR:
      return { ...state, isLoading: false, error: action.error, totalCount: null }
    case actionTypes.LOADED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        items: [...state.items, ...action.payload.items],
        totalCount: action.payload.totalCount,
      }
    case actionTypes.NEXT_PAGE:
      return { ...state, page: state.page + 1 }
    default:
      return state
  }
}
