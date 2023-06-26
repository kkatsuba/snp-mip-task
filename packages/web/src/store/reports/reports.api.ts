import { ReportResponse } from '../../types/report'
import { apiSlice } from '../api.slice'
import { openSnackbar } from '../snackbar/snackbar.slice'
import { transformReportResponse, transformReportsResponse } from './reports.transform'

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ReportResponse[], number>({
      query: (clientId) => ({
        url: `/clients/${clientId}/reports`,
        params: {},
      }),
      providesTags: ['Reports'],
      transformResponse: transformReportsResponse,
    }),
    addNewReport: builder.mutation<ReportResponse, Omit<ReportResponse, 'id' | 'addedAt'>>({
      query: (payload) => ({
        url: `/clients/${payload.clientId}/reports`,
        method: 'POST',
        body: { ...payload, addedAt: new Date().toUTCString() },
        headers: {
          'Content-type': 'application/json',
        },
      }),
      transformErrorResponse: (error) => {
        return Object.assign({}, error, { message: 'Error during report creation' })
      },
      async onQueryStarted({ clientId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            reportsApiSlice.util.updateQueryData('getReports', clientId, (draft) => {
              return draft.concat(transformReportResponse(data))
            }),
          )
          dispatch(
            openSnackbar({
              message: `Report created`,
              variant: 'success',
            }),
          )
        } catch (e) {
          // noop
        }
      },
    }),
    updateReport: builder.mutation<
      ReportResponse,
      Pick<ReportResponse, 'clientId' | 'id' | 'items'>
    >({
      query: (payload) => ({
        url: `/reports/${payload.id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json',
        },
      }),
      transformErrorResponse: (error) => {
        return Object.assign({}, error, { message: 'Error during report update' })
      },
      async onQueryStarted({ clientId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            reportsApiSlice.util.updateQueryData('getReports', clientId, (draft) => {
              return draft.map((report) =>
                report.id === data.id ? { ...report, items: data.items } : report,
              )
            }),
          )
        } catch (e) {
          // noop
        }
      },
    }),
    removeReport: builder.mutation<void, { clientId: number; reportId: number }>({
      query: (payload) => ({
        url: `/reports/${payload.reportId}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (error) => {
        return Object.assign({}, error, { message: 'Error during report remove' })
      },
      async onQueryStarted({ clientId, reportId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            reportsApiSlice.util.updateQueryData('getReports', clientId, (draft) => {
              return draft.filter((x) => x.id !== reportId)
            }),
          )
          dispatch(
            openSnackbar({
              message: `Report #${reportId} removed`,
              variant: 'success',
            }),
          )
        } catch (e) {
          // noop
        }
      },
    }),
  }),
})

export const {
  useGetReportsQuery,
  useAddNewReportMutation,
  useUpdateReportMutation,
  useRemoveReportMutation,
} = reportsApiSlice
