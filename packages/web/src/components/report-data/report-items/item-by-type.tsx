import { ReportItem } from '../../../types/report'
import { Circle } from './circle'
import { Hexagon } from './hexagon'
import { Square } from './square'
import { Triangle } from './triangle'

export const ReportItemByType = {
  [ReportItem.Circle]: Circle,
  [ReportItem.Hexagon]: Hexagon,
  [ReportItem.Square]: Square,
  [ReportItem.Triangle]: Triangle,
}
