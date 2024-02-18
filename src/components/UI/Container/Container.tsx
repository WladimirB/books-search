import { IUIProps } from 'components/types'
import React from 'react'
import styled from 'styled-components'
import { getBreakPoint } from 'styles/breakpoints'
import { replaceSameClasses } from 'utils/replaceSameClasses'

export interface IContainerProps extends IUIProps {
  fullWidth?: boolean
}

const containerMaxWidths = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
  xxl: 1320,
}

type TKey = keyof typeof containerMaxWidths

const FullWidth = styled.div`
  padding: 0 15px;
  width: 100%;
  box-sizing: birder-box;
`
const Responsive = styled(FullWidth)`
  margin: 0 auto;
  ${Object.keys(containerMaxWidths).map((key) => {
    const brekpoint = getBreakPoint(key)
    if (brekpoint) {
      return `@media screen and (min-width: ${brekpoint}px) {
        max-width: ${containerMaxWidths[key as TKey]}px
      }`
    } else {
      return ''
    }
  })}
`

export const Container: React.FC<IContainerProps> = ({ style, className, fullWidth, children }) => {
  const classes = className ? replaceSameClasses(className) : undefined

  return fullWidth ? (
    <FullWidth style={style} className={classes}>
      {children}
    </FullWidth>
  ) : (
    <Responsive style={style} className={classes}>
      {children}
    </Responsive>
  )
}
