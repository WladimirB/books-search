import React from 'react'
import { Button as UIButton } from '../UI'
import { IButtonProps } from '../UI/Button/Button'
import { RootState } from 'store'
import { useAppSelector } from 'hooks/useStoreHooks'
import ClipLoader from 'react-spinners/ClipLoader'
import { baseTheme } from 'styles/theme'
import styled from 'styled-components'

const Button = styled(UIButton)`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

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
      {isLoading ? (
        <ClipLoader color={baseTheme.colors.white} size={18} loading={isLoading} />
      ) : (
        children
      )}
    </Button>
  )
}
