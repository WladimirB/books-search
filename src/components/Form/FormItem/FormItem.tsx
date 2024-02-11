import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'
import { FormContext, IFormContext } from '../FormRoot/Form'

const Styled = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
`

interface IFormItemProps extends Omit<IUIProps, 'children'> {
  name: string
  label?: string
  children: React.ReactElement<IInputProps>
}

export interface IInputProps {
  value: string
  onChange: (value: string) => void
}

const allowedTags = ['input', 'select', 'checkbox', 'button']
const allowedElements = ['Input', 'Select']

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
  const { state, handlers } = React.useContext<IFormContext>(FormContext)

  const value = state?.[name as keyof typeof state] || null
  const handleChange = (value: any) => handlers.updateValues({ name: name, value: value })

  const injectionProps: IInputProps = {
    value,
    onChange: handleChange,
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
    </Styled>
  )
}
