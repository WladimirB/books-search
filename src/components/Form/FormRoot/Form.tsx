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
  allowElements: string[]
}

export const FormContext = React.createContext<IFormContext>({
  state: {},
  handlers: {
    // eslint-disable-next-line no-console
    updateValues: () => console.error('not initialized'),
  },
  errors: {},
  allowElements: [],
})

interface IFormProps<T> {
  formEntity: ReturnType<typeof useFormState>
  onSubmit?: (state: T) => void
  onReset?: () => void
  className?: string
  useValdation?: () => Struct<any, unknown>
  children: React.ReactNode
  allowElements?: string[]
}

export const Form = <T extends object>({
  children,
  formEntity,
  onSubmit,
  useValdation,
  allowElements,
  ...restProps
}: IFormProps<T>) => {
  const [errors, setErrors] = React.useState<IErrors<keyof typeof formEntity.state>>(undefined)
  const validationSchema = useValdation?.()

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const isValid = validationSchema ? validate() : true
    if (isValid) {
      onSubmit?.(formEntity.state as T)
    }
  }

  const validate = React.useCallback(() => {
    if (!validationSchema) {
      return true
    }
    try {
      assert(formEntity.state, validationSchema)
      setErrors({})
      return true
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
        return false
      }
      return true
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEntity.state, validationSchema])

  return (
    <FormContext.Provider value={{ ...formEntity, errors, allowElements: allowElements || [] }}>
      <form onSubmit={submit} {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
