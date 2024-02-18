import React from 'react'
import { SnackBar } from '../../components/UI'
import { selectors } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from 'store/snackbar/actions'

export const AppSnackbar: React.FC = () => {
  const snackBarState = useSelector(selectors.snackBarSelector)
  const dispatch = useDispatch()

  return (
    <SnackBar
      onClose={() => dispatch(closeSnackbar())}
      type={snackBarState.type}
      isShow={!!snackBarState.message}
      duration={5000}
    >
      {snackBarState.message || ''}
    </SnackBar>
  )
}
