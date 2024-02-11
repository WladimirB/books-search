import React from 'react'

interface IFormProps extends React.PropsWithChildren {
  onSubmit?: () => void
  onReset?: () => void
}

export const Form: React.FC<IFormProps> = ({ children, ...restProps }) => {
  return <form {...restProps}>{children}</form>
}
