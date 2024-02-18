import { Card, Container } from '../UI'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectors } from 'store'
import styled from 'styled-components'
import BooksCounter from '../BooksCounter'
import { breakPoints, media } from 'styles/breakpoints'
import ConnectedButton from '../ConnectedButton'
import { baseTheme } from 'styles/theme'
import { useAppDispatch } from 'hooks/useStoreHooks'
import { loadMore } from 'store/books/actions'

const MainContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 30px;
  min-height: calc(100vh - 455px - 82px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${media(breakPoints.lg, `min-height: calc(100vh - 376px - 82px);`)}

  .load-more {
    margin-top: ${baseTheme.padding.container}px;
    min-width: 150px;
  }
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -10px;
  row-gap: 20px;
`

const Col = styled.div`
  width: 33.3%;
  padding: 0 10px;
`

export const Main: React.FC = () => {
  const isLoading = useSelector(selectors.isBooksLoading)
  const books = useSelector(selectors.booksSelector)
  const total = useSelector(selectors.booksTotalCount)
  const error = useSelector(selectors.booksError)
  const dispatch = useAppDispatch()
  const showLoading = isLoading && !books.length
  const showMore = (total || 0) > books.length

  const loadMoreBooks = () => {
    dispatch(loadMore())
  }

  return (
    <MainContainer>
      <BooksCounter />
      {showLoading && <Center>{'Loading'}</Center>}
      {books.length > 0 && (
        <Row>
          {books.map((book, index) => (
            <Col key={book.id + index}>
              <Card
                image={book.volumeInfo?.imageLinks?.thumbnail || ''}
                title={book.volumeInfo?.title || ''}
                authors={book.volumeInfo?.authors || []}
                categories={book.volumeInfo?.categories}
              />
            </Col>
          ))}
        </Row>
      )}
      {showMore && (
        <ConnectedButton
          disabled={!!error}
          onClick={loadMoreBooks}
          className='load-more'
          selector={selectors.isBooksLoading}
          type='button'
        >
          Load more
        </ConnectedButton>
      )}
    </MainContainer>
  )
}
