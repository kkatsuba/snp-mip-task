import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ClientResponse } from '../../types/client'

export const clientsApiSlice = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/clients` }),
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    getClients: builder.query<ClientResponse[], void>({
      query: () => ({
        url: '',
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
        url: '',
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
        const { data } = await queryFulfilled
        dispatch(
          clientsApiSlice.util.updateQueryData('getClients', undefined, (draft) => {
            return draft.concat(data)
          }),
        )
      },
    }),
    removeClient: builder.mutation<ClientResponse, number>({
      query: (payload) => ({
        url: `/${payload}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (error) => {
        return Object.assign({}, error, { message: 'Error during client remove' })
      },
      // invalidatesTags: ['Clients'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(
          clientsApiSlice.util.updateQueryData('getClients', undefined, (draft) => {
            return draft.filter((x) => x.id !== id)
          }),
        )
      },
    }),
  }),
})

export const { useGetClientsQuery, useAddNewClientMutation, useRemoveClientMutation } =
  clientsApiSlice
