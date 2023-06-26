import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { apiSlice } from './api.slice'
import { clients } from './clients/clients.slice'
import { rtkQueryErrorLogger } from './rtk-error-middleware'
import { snackbar } from './snackbar/snackbar.slice'

export const store = configureStore({
  reducer: {
    clients,
    snackbar,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger, apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
