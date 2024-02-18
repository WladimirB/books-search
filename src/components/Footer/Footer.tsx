import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'
import { baseTheme } from 'styles/theme'

const Styled = styled.footer`
  padding: ${baseTheme.padding.footer}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${baseTheme.colors.white};
  background-color: ${baseTheme.colors.black};
`
export const Footer: React.FC<IUIProps> = ({ children, ...rest }) => {
  return <Styled {...rest}>{children}</Styled>
}
