import * as actionTypes from './action_types'
import { AppAction, DispatchType } from '../type'
import { RootState } from 'store'
import { delay } from 'utils/delay'

export interface IFilter {
  search: string
  order: string
  category: string
}

export const loading = () => ({ type: actionTypes.LOADING })
export const success = (payload: Array<any>): AppAction => ({
  type: actionTypes.LOADED_SUCCESS,
  payload,
})
export const error = (error: Error) => ({ type: actionTypes.LOADED_ERROR, error })
const changeFilter = (fiter: IFilter) => ({
  type: actionTypes.CHANGE_FILTER,
  payload: fiter,
})

const loadBooks = (fiter: IFilter) => {
  return async (dispatch: DispatchType, getState: () => RootState) => {
    const { isLoading } = getState().books
    if (isLoading) {
      return
    }
    dispatch(loading())
    try {
      await delay(3000)
      dispatch(success([]))
    } catch (error: any) {
      dispatch(error(error))
    }
  }
}

export const searchBooks = (filter: IFilter) => {
  return (dispatch: DispatchType) => {
    dispatch(changeFilter(filter))
    dispatch(loadBooks(filter))
  }
}

export const nextPage = () => ({ type: actionTypes.NEXT_PAGE })
