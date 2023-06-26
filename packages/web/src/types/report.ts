export enum ReportItem {
  Circle = 'circle',
  Square = 'square',
  Triangle = 'triangle',
  Hexagon = 'hexagon',
}

export interface ReportResponse {
  id: number
  clientId: number
  addedAt: string
  items: { id: number; type: ReportItem }[]
}
