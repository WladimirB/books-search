import { Card, Container } from '../UI'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectors } from 'store'
import styled from 'styled-components'
import BooksCounter from '../BooksCounter'
import { breakPoints, media } from 'styles/breakpoints'

const MainContainer = styled(Container)`
  padding: 15px;
  min-height: calc(100vh - 455px - 82px);
  ${media(breakPoints.lg, `min-height: calc(100vh - 376px - 82px);`)}
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 300px);
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
  const showLoading = isLoading && !books.length

  return (
    <MainContainer>
      <BooksCounter />
      {showLoading && <Center>{'Loading'}</Center>}
      {books.length > 0 && (
        <Row>
          {books.map((book) => (
            <Col key={book.id}>
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
    </MainContainer>
  )
}
