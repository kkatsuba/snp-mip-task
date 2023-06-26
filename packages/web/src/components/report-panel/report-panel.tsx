import React, { useCallback } from 'react'
import { useRemoveReportMutation, useUpdateReportMutation } from '../../store/reports/reports.api'
import { ReportResponse } from '../../types/report'
import { randomReportData } from '../../util/random-report-data'
import { AccordionButton, AccordionHeader, AccordionItem, AccordionPanel } from '../accordion'
import { AccordionIcon } from '../accordion/accordion-icon'
import { Button } from '../button/button'
import { ReportData } from '../report-data/report-data'
import styles from './report-panel.module.scss'

type Props = ReportResponse

export const ReportPanel = React.memo((props: Props) => {
  const { id: reportId, addedAt, clientId, items } = props
  const [removerReport, { isLoading: isRemoving }] = useRemoveReportMutation()
  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation()

  const onAddReportData = useCallback(() => {
    updateReport({
      id: reportId,
      clientId,
      items: [
        ...items,
        {
          id: (items.at(-1)?.id ?? 0) + 1,
          type: randomReportData(),
        },
      ],
    })
  }, [clientId, items, reportId, updateReport])

  const onRemoveReportData = useCallback(
    (reportDataId: number) => {
      updateReport({
        id: reportId,
        clientId,
        items: items.filter((x) => x.id !== reportDataId),
      })
    },
    [clientId, items, reportId, updateReport],
  )

  return (
    <AccordionItem>
      <AccordionHeader>
        <AccordionIcon />
        <AccordionButton>
          #{reportId} ({addedAt})
        </AccordionButton>
        <Button
          variant="ghost"
          title="Delete Report"
          onClick={() => removerReport({ clientId, reportId })}
          disabled={isRemoving}
        >
          ❌
        </Button>
      </AccordionHeader>
      <AccordionPanel>
        <div className={styles.reportPanel}>
          <div className={styles.reportPanelHeader}>
            <span>Report #{reportId} data</span>
            <Button variant="secondary" onClick={onAddReportData} disabled={isUpdating}>
              Add data
            </Button>
          </div>
          <div className={styles.reportPanelItems}>
            {items.map((item) => (
              <ReportData
                key={item.id}
                {...item}
                onRemove={onRemoveReportData}
                disabled={isUpdating}
              />
            ))}
          </div>
        </div>
      </AccordionPanel>
    </AccordionItem>
  )
})

ReportPanel.displayName = 'ReportPanel'
