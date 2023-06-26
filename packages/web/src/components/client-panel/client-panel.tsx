import React from 'react'
import { useAddNewReportMutation, useGetReportsQuery } from '../../store/reports/reports.api'
import { ClientResponse } from '../../types/client'
import { Accordion } from '../accordion'
import { Button } from '../button/button'
import { Loader } from '../loader/loader'
import { ReportPanel } from '../report-panel/report-panel'
import styles from './client-panel.module.scss'

type Props = ClientResponse

export const ClientPanel = (props: Props) => {
  const { id } = props
  const { data: reports, isFetching, isError } = useGetReportsQuery(id)
  const [addReport, { isLoading: isAdding }] = useAddNewReportMutation()

  const onAddReport = () => {
    addReport({
      clientId: id,
      items: [],
    })
  }

  return (
    <div className={styles.clientPanel}>
      <div className={styles.panelHeader}>
        <span>Reports</span>
        <Button variant="secondary" onClick={onAddReport} disabled={isAdding || isFetching}>
          Add report
        </Button>
      </div>

      {isError && <div>{`Houston, We've Got a Problem. Please take a try bit later`}</div>}
      {!isFetching && !reports?.length && (
        <div>{`No reports yet. Click the "Add report" button to proceed`}</div>
      )}
      {!isFetching && reports && (
        <Accordion>
          {reports.map((report) => (
            <ReportPanel key={report.id} {...report} />
          ))}
        </Accordion>
      )}
      {isFetching && <Loader />}
    </div>
  )
}
