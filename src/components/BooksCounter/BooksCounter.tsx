import React from 'react'
import { useAppSelector } from 'hooks/useStoreHooks'
import { selectors } from 'store'
import styled from 'styled-components'

const Styled = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.1;
  margin-top: 0;
`

export const BooksCounter: React.FC = () => {
  const count = useAppSelector(selectors.booksTotalCount)
  return <Styled>{count && 'Results found ' + count}</Styled>
}
