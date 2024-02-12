import React, { FormEvent } from 'react'
import { Struct, StructError, assert } from 'superstruct'
import { useFormState } from './Form.hooks'

type IErrors<T> = Record<keyof T, string> | undefined

export interface IFormContext<T extends {} = {}> {
  state: T
  handlers: {
    updateValues: <T>({ name, value }: { name: string; value: T }) => void
  }
  errors: IErrors<T> | undefined
}

export const FormContext = React.createContext<IFormContext>({
  state: {},
  handlers: {
    // eslint-disable-next-line no-console
    updateValues: () => console.error('not initialized'),
  },
  errors: {},
})

interface IFormProps extends React.PropsWithChildren {
  formEntity: ReturnType<typeof useFormState>
  onSubmit?: <T>(state: T) => void
  onReset?: () => void
  className?: string
  useValdation?: () => Struct<any, unknown>
}

export const Form: React.FC<IFormProps> = ({
  children,
  formEntity,
  onSubmit,
  useValdation,
  ...restProps
}) => {
  const [errors, setErrors] = React.useState<IErrors<keyof typeof formEntity.state>>(undefined)
  const validationSchema = useValdation?.()

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    validationSchema && validate()
    onSubmit?.(formEntity.state)
  }

  const validate = React.useCallback(() => {
    console.log('call')
    if (!validationSchema) {
      return
    }
    try {
      assert(formEntity.state, validationSchema)
      setErrors({})
    } catch (error) {
      if (error instanceof StructError) {
        const errorObj = error.failures().reduce(
          (acc, { key, message }) => ({
            ...acc,
            [key]: message,
          }),
          {},
        )
        setErrors(errorObj as IErrors<keyof typeof formEntity.state>)
        return errorObj
      }
    }
    return {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEntity.state, validationSchema])

  return (
    <FormContext.Provider value={{ ...formEntity, errors }}>
      <form onSubmit={submit} {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
