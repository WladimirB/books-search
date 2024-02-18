import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'
import { FormContext, IFormContext } from '../FormRoot/Form'
import { baseTheme } from 'styles/theme'

const Styled = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;

  // .form__validation-error {
  //   color: ${baseTheme.colors.danger};
  //   opacity: 0;
  //   transition: opacity 0.3s ease-in-out;
  // }
`

const FormItemFooter = styled.div<{ $opacity: 0 | 1 }>`
  min-height: ${baseTheme.fontSizes.small + baseTheme.padding.input}px;
  color: ${baseTheme.colors.danger};
  opacity: ${(props) => props.$opacity};
  transition: opacity 0.3s ease-in-out;
`

interface IFormItemProps extends Omit<IUIProps, 'children'> {
  name: string
  label?: string
  children: React.ReactElement<IInputProps>
}

export interface IInputProps {
  value: string
  onChange: (value: string) => void
  invalid?: boolean
}

const allowedTags = ['input', 'select', 'checkbox', 'button']
const allowedElements = ['Input', 'Select', 'Button']

const getChildren = (child: React.ReactElement) => {
  if (typeof child !== 'string' && typeof child !== 'number') {
    if (typeof child.type === 'string' && allowedTags.includes(child.type)) {
      return child
    } else if (typeof child.type === 'function' && allowedElements.includes(child.type.name)) {
      return child
    } else {
      // eslint-disable-next-line no-console
      console.error('FormItem children are not allowed')
      return null
    }
  } else {
    // eslint-disable-next-line no-console
    console.error('Provide valid FormItem children')
    return null
  }
}

export const FormItem: React.FC<IFormItemProps> = ({ label, name, children, ...rest }) => {
  const { state, handlers, errors } = React.useContext<IFormContext>(FormContext)

  const value = state?.[name as keyof typeof state] || null
  const error = errors?.[name as keyof typeof errors]
  const handleChange = (value: any) => handlers.updateValues({ name: name, value: value })

  const injectionProps: IInputProps = {
    value,
    onChange: handleChange,
    invalid: !!error,
  }

  const child = getChildren(children)
  const element = child
    ? name === 'submit'
      ? child
      : React.cloneElement(child, injectionProps)
    : null

  // const element = React.isValidElement(children)
  //   ? React.cloneElement(children, injectionProps)
  //   : null

  return (
    <Styled {...rest}>
      {label && <label>{label}</label>}
      {element}
      <FormItemFooter $opacity={error ? 1 : 0}>
        <small>{error}</small>
      </FormItemFooter>
    </Styled>
  )
}
