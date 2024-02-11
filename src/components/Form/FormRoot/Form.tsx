import React, { FormEvent } from 'react'

export interface IFormContext<T extends {} = {}> {
  state: T
  handlers: {
    updateValues: <T>({ name, value }: { name: string; value: T }) => void
  }
}

export const FormContext = React.createContext<IFormContext>({
  state: {},
  handlers: {
    // eslint-disable-next-line no-console
    updateValues: () => console.error('not initialized'),
  },
})

interface IFormProps extends React.PropsWithChildren {
  formEntity: IFormContext
  onSubmit?: <T>(state: T) => void
  onReset?: () => void
  className?: string
}

export const Form: React.FC<IFormProps> = ({ children, formEntity, onSubmit, ...restProps }) => {
  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    onSubmit?.(formEntity.state)
  }

  return (
    <FormContext.Provider value={formEntity}>
      <form onSubmit={submit} {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
