import { Container } from '../UI'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 300px);
`

export const Main: React.FC = () => {
  const { isLoading, filter } = useSelector((state: RootState) => state.books)
  return (
    <Container>
      <Center>
        {isLoading
          ? 'Loading'
          : Object.keys(filter).map((objKey, index) => {
              return (
                <span key={index}>
                  {objKey}:{filter[objKey]}
                </span>
              )
            })}
      </Center>
    </Container>
  )
}
