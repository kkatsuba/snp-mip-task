import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const clientsSlice = createSlice({
  name: '@@clients',
  initialState,
  reducers: {
    updateClientsSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const clients = clientsSlice.reducer
export const { updateClientsSearch } = clientsSlice.actions
