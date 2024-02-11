import { IUIProps } from 'components/types'
import React from 'react'

interface IInputProps extends Omit<IUIProps, 'children'> {
  value?: string | null
  onChange?: (value: string) => void
}

export const Input: React.FC<IInputProps> = (props) => {
  return (
    <input value={props.value || ''} onChange={(ev) => props?.onChange?.(ev.target.value)}></input>
  )
}
