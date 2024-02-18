import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'
import { baseTheme } from 'styles/theme'

interface IInputProps extends Omit<IUIProps, 'children'> {
  value?: string | null
  onChange?: (value: string) => void
  invalid?: boolean
}

const Styled = styled.input`
  padding: ${baseTheme.padding.input / 2}px ${baseTheme.padding.input}px;
  font-size: ${baseTheme.fontSizes.body}px;
  color: ${baseTheme.colors.dark};
  border: 2px solid ${baseTheme.colors.input};
  border-radius: ${baseTheme.borderRadius / 2}px;

  &:focus-visible {
    border-color: ${baseTheme.colors.primary};
    outline: 1px solid ${baseTheme.colors.primary};
  }

  &[data-invalid='true'] {
    border-color: ${baseTheme.colors.danger};
    // outline: 1px solid ${baseTheme.colors.danger};
  }
`

export const Input: React.FC<IInputProps> = (props) => {
  return (
    <Styled
      data-invalid={props.invalid ? 'true' : null}
      value={props.value || ''}
      onChange={(ev) => props?.onChange?.(ev.target.value)}
    />
  )
}
