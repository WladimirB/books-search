import * as actionTypes from './action_types'
import { DispatchType } from '../type'
import { RootState } from 'store'
import { TOrder, getBooks } from 'data'
import { IBookModel } from 'data/models/booksModel'
import { showWarning } from 'store/snackbar/actions'

interface IFilter {
  search: string
  order: TOrder
  category: string
}

class LoadMoreError extends Error {
  message: string
  constructor() {
    const msg = 'Error occur when tryin to load more books'
    super(msg)
    this.message = msg

    Object.setPrototypeOf(this, LoadMoreError.prototype)
  }
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
      const { items = [], totalItems = 0 } = response.data
      const prevTotal = getState().books.totalCount
      if (prevTotal && prevTotal > totalItems) {
        throw new LoadMoreError()
      }
      dispatch(success({ items, totalCount: totalItems }))
    } catch (err: any) {
      if (err instanceof LoadMoreError) {
        dispatch(showWarning(err.message))
      }
      dispatch(error(err))
    }
  }
}

export const searchBooks = (filter: IFilter) => {
  return (dispatch: DispatchType) => {
    dispatch(changeFilter(filter))
    dispatch(loadBooks(filter))
  }
}

const nextPage = () => ({ type: actionTypes.NEXT_PAGE })

export const loadMore = () => {
  return (dispatch: DispatchType, getState: () => RootState) => {
    dispatch(nextPage())
    const filter: IFilter = getState().books.filter
    dispatch(loadBooks(filter))
  }
}
