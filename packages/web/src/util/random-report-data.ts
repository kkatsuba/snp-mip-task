import { ReportItem } from '../types/report'
import { random } from './random'

const reportData = [ReportItem.Circle, ReportItem.Hexagon, ReportItem.Square, ReportItem.Triangle]

export const randomReportData = () => {
  return reportData[random(0, reportData.length)]
}
