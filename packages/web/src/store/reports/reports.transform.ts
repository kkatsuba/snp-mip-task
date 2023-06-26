import { ReportResponse } from '../../types/report'

export const transformReportResponse = (report: ReportResponse) => ({
  ...report,
  clientId: Number(report.clientId),
  addedAt: new Date(report.addedAt).toLocaleString(),
})

export const transformReportsResponse = (reports: ReportResponse[]) =>
  reports.map(transformReportResponse)
