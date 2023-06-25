import { createSlice } from '@reduxjs/toolkit'
import { closeSnackbar, openSnackbar } from './snackbar.actions'
import { SnackbarReducer } from './snackbar.types'

const initialState: SnackbarReducer = {
  snackbarStack: [],
}

let snackbarId = 0

export const snackbarSlice = createSlice({
  name: '@@snackbar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openSnackbar, (state, action) => {
      state.snackbarStack = [{ id: ++snackbarId, ...action.payload }, ...state.snackbarStack]
    })

    builder.addCase(closeSnackbar, (state, action) => {
      state.snackbarStack = state.snackbarStack.filter((x) => x.id !== action.payload)
    })
  },
})

export const snackbar = snackbarSlice.reducer
