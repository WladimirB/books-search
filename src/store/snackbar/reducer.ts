import { TSnackbarType } from 'components/UI/SnackBar/Snackbar'
import * as actionTypes from './action_types'
import { AppAction } from 'store/type'

interface ISnackbarState {
  type: TSnackbarType
  message?: string | null
}

const initialStateState: ISnackbarState = {
  type: 'primary',
}

export const snackbarReducer = (
  state = initialStateState,
  action: AppAction<any>,
): ISnackbarState => {
  switch (action.type) {
    case actionTypes.SHOW_SNACKBAR:
      return {
        type: action.payload.type,
        message: action.payload.message,
      }
    case actionTypes.CLOSE_SNACKABAR:
      return { ...state, message: null }
    default:
      return state
  }
}
