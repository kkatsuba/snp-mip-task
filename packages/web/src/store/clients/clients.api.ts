import { ClientResponse } from '../../types/client'
import { apiSlice } from '../api.slice'
import { openSnackbar } from '../snackbar/snackbar.slice'

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<ClientResponse[], void>({
      query: () => ({
        url: '/clients',
      }),
      providesTags: ['Clients'],
      transformResponse: (clients: ClientResponse[]) => {
        return clients.map((client) => ({
          ...client,
          addedAt: new Date(client.addedAt).toLocaleString(),
        }))
      },
    }),
    addNewClient: builder.mutation<ClientResponse, Omit<ClientResponse, 'id'>>({
      query: (payload) => ({
        url: '/clients',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      transformErrorResponse: (error) => {
        return Object.assign({}, error, { message: 'Error during client creation' })
      },
      // invalidatesTags: ['Clients'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            openSnackbar({
              message: `Client "${data.name}" succesfully added`,
              variant: 'success',
            }),
          )
          dispatch(
            clientsApiSlice.util.updateQueryData('getClients', undefined, (draft) => {
              return draft.concat({
                ...data,
                addedAt: new Date(data.addedAt).toLocaleString(),
              })
            }),
          )
        } catch {
          // noop
        }
      },
    }),
    removeClient: builder.mutation<void, number>({
      query: (payload) => ({
        url: `/clients/${payload}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (error) => {
        return Object.assign({}, error, { message: 'Error during client remove' })
      },
      // invalidatesTags: ['Clients'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            openSnackbar({
              message: `Client #${id} removed`,
              variant: 'success',
            }),
          )
          dispatch(
            clientsApiSlice.util.updateQueryData('getClients', undefined, (draft) => {
              return draft.filter((x) => x.id !== id)
            }),
          )
        } catch {
          // noop
        }
      },
    }),
  }),
})

export const { useGetClientsQuery, useAddNewClientMutation, useRemoveClientMutation } =
  clientsApiSlice
