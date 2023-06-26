import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { openSnackbar } from './snackbar/snackbar.slice'

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.message) {
    next(openSnackbar({ message: action.payload.message, variant: 'error' }))
  }

  return next(action)
}
