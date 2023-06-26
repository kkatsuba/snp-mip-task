import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SnackbarPayload, SnackbarReducer } from './snackbar.types'

const initialState: SnackbarReducer = {
  snackbarStack: [],
}

let snackbarId = 0

export const snackbarSlice = createSlice({
  name: '@@snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarPayload>) => {
      state.snackbarStack = [{ id: ++snackbarId, ...action.payload }, ...state.snackbarStack]
    },
    closeSnackbar: (state, action: PayloadAction<number>) => {
      state.snackbarStack = state.snackbarStack.filter((x) => x.id !== action.payload)
    },
  },
})

export const snackbar = snackbarSlice.reducer
export const { closeSnackbar, openSnackbar } = snackbarSlice.actions
