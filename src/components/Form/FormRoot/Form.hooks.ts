import React from 'react'

interface IUseFormStateProps {
  initialState: {}
}

export function useFormState<T extends {} = {}>({ initialState = {} }: IUseFormStateProps) {
  const [state, setState] = React.useState(initialState as T)

  const updateValues = React.useCallback(({ name, value }: { name: string; value: any }) => {
    setState((prevState) => ({ ...prevState, ...{ [name]: value } }))
  }, [])

  return {
    state,
    handlers: {
      updateValues,
    },
  }
}
