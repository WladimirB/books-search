import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'

import FormLib from '../Form'

import HeaderBg from 'assets/images/header.jpg'
import { Container } from '../UI'
import { object, string, define, optional } from 'superstruct'
import { useDispatch } from 'react-redux'
import { searchBooks } from 'store/books/actions'
import instance from 'data'

const { Input, Select } = FormLib

const Styled = styled.header`
  padding: 30px 0;
  width: 100%;
  min-height: 200px;
  color: #fff;
  background: url(${HeaderBg}) center / 100% auto no-repeat;

  .form-container {
    max-width: 800px;
  }

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
  category: string
  order: string
}

interface IHeaderProps extends Omit<IUIProps, 'children'> {}

const isRequired = () => define('isRequired', (value) => !!value || 'This field mustn`t be empty')

const validationSchema = object({
  search: isRequired(),
  category: optional(string()),
  order: optional(string()),
})

function validation() {
  return validationSchema
}

export const Header: React.FC<IHeaderProps> = ({ className, style }) => {
  const { state, handlers } = FormLib.useFormState<ISearchData>({
    initialState: {
      category: 'poetry',
      order: 'newest',
    },
  })
  const dispatch = useDispatch()

  return (
    <Styled className={className} style={style}>
      <Container className='form-container'>
        <FormLib.Form
          onSubmit={(val) => {
            instance.get('', {
              params: {
                q: `${state.search}${
                  state.category && state.category !== 'all' ? '+subject:' + state.category : ''
                }`,
                maxResults: 40,
                startIndex: 1,
                orderBy: state.order,
              },
            })
          }}
          className='header-form'
          formEntity={{ state, handlers }}
          useValdation={validation}
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
                { value: 'revelance', label: 'Revelance' },
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
