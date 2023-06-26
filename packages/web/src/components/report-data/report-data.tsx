import React from 'react'
import { ReportItem } from '../../types/report'
import { Button } from '../button/button'
import styles from './report-data.module.scss'
import { ReportItemByType } from './report-items/item-by-type'

interface Props {
  id: number
  type: ReportItem
  onRemove: (id: number) => void
  disabled: boolean
}

export const ReportData = React.memo((props: Props) => {
  const { id, type, onRemove, disabled } = props
  const ReportItem = ReportItemByType[type]

  return (
    <div className={styles.reportData}>
      <span className={styles.reportDataIndex}>#{id}</span>
      <ReportItem />
      <Button
        className={styles.reportDataRemoveButton}
        variant="ghost"
        title="Delete data"
        onClick={() => onRemove(id)}
        disabled={disabled}
      >
        ❌
      </Button>
    </div>
  )
})

ReportData.displayName = 'ReportData'
