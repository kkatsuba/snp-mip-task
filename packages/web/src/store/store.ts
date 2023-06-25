import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { clientsApiSlice } from './clients/clients.api'
import { clients } from './clients/clients.slice'
import { rtkQueryErrorLogger } from './rtk-error-middleware'
import { snackbar } from './snackbar/snackbar.slice'

export const store = configureStore({
  reducer: {
    clients,
    snackbar,
    [clientsApiSlice.reducerPath]: clientsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientsApiSlice.middleware, rtkQueryErrorLogger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
