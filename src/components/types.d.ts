import { PropsWithChildren, CSSProperties } from 'react'

export interface IUIProps extends PropsWithChildren {
  style?: CSSProperties
  className?: string
}
