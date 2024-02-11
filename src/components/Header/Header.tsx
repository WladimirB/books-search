import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'

import FormLib from '../Form'

import HeaderBg from 'assets/images/header.jpg'
import { Container } from '../UI'

const { Input, Select } = FormLib

const Styled = styled.header`
  padding: 30px 0;
  width: 100%;
  min-height: 200px;
  color: #fff;
  background: url(${HeaderBg}) center / 100% auto no-repeat;

  .header-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
    margin: 0 -10px;

    &__item {
      width: 50%;
      padding: 0 10px;

      &_full-width {
        width: 100%;
      }
    }
  }
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

  return (
    <Styled className={className} style={style}>
      <Container>
        <FormLib.Form
          onSubmit={(val) => {
            console.log('v', val)
          }}
          className='header-form'
          formEntity={{ state, handlers }}
        >
          <FormLib.FormItem
            className='header-form__item header-form__item_full-width'
            name='search'
            label='Search'
          >
            <Input />
          </FormLib.FormItem>
          <FormLib.FormItem className='header-form__item' name='category' label='Category'>
            <Select
              options={[
                { value: 'all', label: 'All' },
                { value: 'art', label: 'Art' },
                { value: 'biography', label: 'Biography' },
                { value: 'computers', label: 'Computers' },
                { value: 'history', label: 'History' },
                { value: 'medical', label: 'Medical' },
                { value: 'poetry', label: 'Poetry' },
              ]}
            />
          </FormLib.FormItem>
          <FormLib.FormItem className='header-form__item' name='order' label='Order'>
            <Select
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'rev', label: 'Revelance' },
              ]}
            />
          </FormLib.FormItem>
          <div className='header-form__item'>
            <FormLib.FormItem name='submit'>
              <button type='submit'>Search</button>
            </FormLib.FormItem>
          </div>
        </FormLib.Form>
      </Container>
    </Styled>
  )
}
