import { VariantType } from 'notistack'

export interface Snackbar {
  id: number
  message: string | JSX.Element
  description?: string | JSX.Element
  variant: VariantType
  autoHideDuration?: number | null
  verticalPosition?: 'top' | 'bottom'
  horizontalPosition?: 'left' | 'center' | 'right'
}

export type SnackbarPayload = Omit<Snackbar, 'id'>

export interface SnackbarReducer {
  snackbarStack: Snackbar[]
}
