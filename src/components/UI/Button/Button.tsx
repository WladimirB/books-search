import React from 'react'
import { IUIProps } from 'components/types'
import styled from 'styled-components'
import { baseTheme } from 'styles/theme'
import { lighten, darken } from 'polished'

type TButtonType = 'primary' | 'dark' | 'warning' | 'success' | 'danger'

interface IButtonProps extends IUIProps {
  type: 'submit' | 'button'
  variant?: TButtonType
  color?: string
  onClick?: (ev: React.SyntheticEvent) => void
  disabled?: boolean
}

const Styled = styled.button<{ $variant: TButtonType; $color: string }>`
  background-color: ${(props) => baseTheme.colors[props.$variant as keyof typeof baseTheme.colors]};
  padding: ${baseTheme.padding.button}px ${baseTheme.padding.button * 2}px;
  color: ${(props) => props.$color};
  border: 1px solid transparent;
  font-size: ${baseTheme.fontSizes.body}px;
  border-radius: ${baseTheme.borderRadius / 2}px;

  &:hover {
    background-color: ${(props) =>
      lighten(0.15, baseTheme.colors[props.$variant as keyof typeof baseTheme.colors])};
  }

  &:disabled {
    background-color: ${(props) =>
      darken(0.3, baseTheme.colors[props.$variant as keyof typeof baseTheme.colors])};
    color: ${(props) => darken(0.3, props.$color)};
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus,
  &:focus-visible {
    border: 1px solid ${baseTheme.colors.primary};
    outline: 1px solid ${baseTheme.colors.primary};
  }
`

export const Button: React.FC<IButtonProps> = ({
  variant,
  color,
  onClick,
  children,
  type,
  disabled,
}) => {
  const click = (ev: React.SyntheticEvent) => {
    onClick && onClick(ev)
  }
  return (
    <Styled
      type={type || 'button'}
      onClick={click}
      $color={color || baseTheme.colors.white}
      $variant={variant || 'primary'}
      disabled={disabled}
    >
      {children}
    </Styled>
  )
}
