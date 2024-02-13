import * as actionTypes from './action_types'
import { AppAction } from '../type'

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
export const changeFilter = (fiter: IFilter) => ({
  type: actionTypes.CHANGE_FILTER,
  payload: fiter,
})
export const nextPage = () => ({ type: actionTypes.NEXT_PAGE })
