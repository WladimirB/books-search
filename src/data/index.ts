import axios, { AxiosResponse } from 'axios'
import store from 'store'
import { showError } from 'store/snackbar/actions'
import { IBookModel } from './models/booksModel'

export type TOrder = 'newest' | 'revelance'

interface IParams {
  search: string
  subject?: string
  orderBy: TOrder
  page: number
}

interface GetBooksResponse {
  totalItems: number
  items: IBookModel[]
}

const offset = 30
const baseUrl = 'https://www.googleapis.com/books/v1/volumes'

const instance = axios.create({
  baseURL: baseUrl,
})

instance.interceptors.request.use(
  (config) => {
    return { ...config, params: { ...config.params, key: process.env.BOOKS_API_KEY } }
  },
  (error) => {
    store.dispatch(showError(error.message))
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 400) {
      store.dispatch(showError(response.data.error.message))
    }
    return response
  },
  (error) => {
    store.dispatch(showError(error.message))
    return Promise.reject(error)
  },
)

export const getBooks = (params: IParams): Promise<AxiosResponse<GetBooksResponse>> => {
  const { search, subject = '', orderBy, page } = params

  return instance.get('', {
    params: {
      q: `${search}${subject ? '+subject:' + subject : ''}`,
      maxResults: offset,
      // eslint-disable-next-line prettier/prettier
      'startIndex': page > 1 ? offset * (page - 1) - 1 : 0,
      orderBy,
    },
  })
}
