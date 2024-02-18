import React from 'react'
import { Button } from '../UI'
import { IButtonProps } from '../UI/Button/Button'
import { RootState } from 'store'
import { useAppSelector } from 'hooks/useStoreHooks'

interface IConnectedButton extends IButtonProps {
  selector: (store: RootState) => boolean
}

export const ConnectedButton: React.FC<IConnectedButton> = ({
  children,
  selector,
  disabled,
  ...rest
}) => {
  const isLoading = useAppSelector(selector)
  return (
    <Button {...rest} disabled={isLoading || disabled}>
      {isLoading ? 'Loading...' : children}
    </Button>
  )
}
