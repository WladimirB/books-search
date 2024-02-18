import { RootState } from 'store'

export const booksSelector = (state: RootState) => state.books.items
export const isBooksLoading = (state: RootState) => state.books.isLoading
export const booksTotalCount = (state: RootState) => state.books.totalCount
export const booksError = (state: RootState) => state.books.error
