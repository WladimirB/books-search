import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'

import FormLib from '../Form'

import HeaderBg from 'assets/images/header.jpg'
import { Container } from '../UI'
import { object, string, define, optional } from 'superstruct'
import { searchBooks } from 'store/books/actions'
import { useAppDispatch } from 'hooks/useStoreHooks'
import { breakPoints, media } from 'styles/breakpoints'
import { baseTheme } from 'styles/theme'
import ConnectedButton from '../ConnectedButton'
import { selectors } from 'store'

const { Input, Select } = FormLib

const Styled = styled.header`
  width: 100%;
  color: #fff;
  background: url(${HeaderBg}) center / auto 100% no-repeat;

  ${media(breakPoints.md, `background: url(${HeaderBg}) center / 100% auto no-repeat;`)}

  .form-container {
    padding: 30px 15px;
    max-width: 800px;
  }

  .header-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -10px;

    &__item {
      width: 100%;
      padding: 0 10px;

      ${media(breakPoints.lg, `width: 50%;`)}

      &_full-width {
        width: 100%;
      }
    }

    button {
      margin-top: ${baseTheme.padding.input}px;
      min-width: calc(100vw - ${baseTheme.padding.container * 2}px);

      ${media(breakPoints.lg, `min-width: unset;`)}
    }
  }
`

const Overlay = styled.div`
  height: 100%;
  width: inherit;
  background-color: rgba(0, 0, 0, 0.5);
`

interface ISearchData {
  search: string
  category: string
  order: 'newest' | 'revelance'
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
  const dispatch = useAppDispatch()

  return (
    <Styled className={className} style={style}>
      <Overlay>
        <Container className='form-container'>
          <h1>Search for books</h1>
          <FormLib.Form
            onSubmit={(val: ISearchData) => {
              dispatch(searchBooks(val))
            }}
            className='header-form'
            formEntity={{ state, handlers }}
            useValdation={validation}
            allowElements={['ConnectedButton']}
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
            <div className='header-form__item header-form__item_full-width'>
              <FormLib.FormItem name='submit'>
                <ConnectedButton
                  selector={selectors.isBooksLoading}
                  type='submit'
                  style={{ minWidth: 150 }}
                >
                  Search
                </ConnectedButton>
              </FormLib.FormItem>
            </div>
          </FormLib.Form>
        </Container>
      </Overlay>
    </Styled>
  )
}
