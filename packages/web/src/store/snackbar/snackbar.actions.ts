import { createAction } from '@reduxjs/toolkit'
import { SnackbarPayload } from './snackbar.types'

export const openSnackbar = createAction<SnackbarPayload>('@@snackbar/openSnackbar')
export const closeSnackbar = createAction<number>('@@snackbar/closeSnackbar')
