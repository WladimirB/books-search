import { IUIProps } from 'components/types'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

import FormLib from '../Form'

import HeaderBg from 'assets/images/header.jpg'
import { Container } from '../UI'

const Styled = styled.header`
  padding: 30px 0;
  width: 100%;
  min-height: 200px;
  color: #fff;
  background: url(${HeaderBg}) center / 100% auto no-repeat;
`

interface ISearchData {
  search: string
  another: string
}

interface IHeaderProps extends Omit<IUIProps, 'children'> {}

export const Header: React.FC<IHeaderProps> = ({ className, style }) => {
  const { state, handlers } = FormLib.useFormState<ISearchData>({
    initialState: {},
  })

  React.useEffect(() => {
    console.log('st', state)
  }, [state])

  return (
    <Styled className={className} style={style}>
      <Container>
        <FormLib.Form>
          <input
            name='search'
            value={state.search}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
              const value = ev.target.value
              handlers.updateValues({ name: 'search', value })
            }}
          />
          <input
            name='another'
            value={state.another}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
              const value = ev.target.value
              handlers.updateValues({ name: 'another', value })
            }}
          />
        </FormLib.Form>
      </Container>
    </Styled>
  )
}
