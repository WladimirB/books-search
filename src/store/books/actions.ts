import * as actionTypes from './action_types'
import { DispatchType } from '../type'
import { RootState } from 'store'
import { getBooks } from 'data'
import { IBookModel } from 'data/models/booksModel'

interface IFilter {
  search: string
  order: 'newest' | 'revelance'
  category: string
}

export const loading = () => ({ type: actionTypes.LOADING })
export const success = (payload: { items: IBookModel[]; totalCount: number }) => ({
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
    const { isLoading, page } = getState().books
    if (isLoading) {
      return
    }
    dispatch(loading())
    try {
      const response = await getBooks({
        search: fiter.search,
        orderBy: fiter.order,
        subject: fiter.category === 'all' ? undefined : fiter.category,
        page,
      })
      console.log('r', response.data)
      const { items = [], totalItems = 0 } = response.data
      dispatch(success({ items, totalCount: totalItems }))
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
