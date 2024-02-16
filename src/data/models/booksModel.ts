export interface IBookModel {
  id: string
  volumeInfo?: {
    title?: string
    pageCount?: number
    description?: string
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
    }
    authors?: string[]
    categories?: string[]
  }
}
