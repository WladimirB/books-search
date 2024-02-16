import { IUIProps } from 'components/types'
import React, { ChangeEvent } from 'react'

interface IOptionProps {
  value: string
  label: string
}

interface ISelectProps extends Omit<IUIProps, 'children'> {
  value?: string | null
  onChange?: (value: string) => void
  options: IOptionProps[]
}

export const Select: React.FC<ISelectProps> = ({ options, onChange, value, ...rest }) => {
  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value
    onChange?.(value || '')
  }

  return (
    <select onChange={handleChange} {...rest} value={value || undefined}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
