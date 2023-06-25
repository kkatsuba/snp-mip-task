import { RootState } from '../store'

export const getSnackbars = ({ snackbar }: RootState) => snackbar.snackbarStack
