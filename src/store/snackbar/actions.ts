import * as actionTypes from './action_types'

export const showWarning = (message: string) => ({
  type: actionTypes.SHOW_SNACKBAR,
  payload: {
    type: 'warning',
    message,
  },
})

export const showError = (message: string) => ({
  type: actionTypes.SHOW_SNACKBAR,
  payload: {
    type: 'error',
    message,
  },
})

export const showSuccess = (message: string) => ({
  type: actionTypes.SHOW_SNACKBAR,
  payload: {
    type: 'success',
    message,
  },
})

export const showInfo = (message: string) => ({
  type: actionTypes.SHOW_SNACKBAR,
  payload: {
    type: 'primary',
    message,
  },
})

export const closeSnackbar = () => ({
  type: actionTypes.CLOSE_SNACKABAR,
})
