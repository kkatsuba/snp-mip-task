import { SnackbarProvider, useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSnackbars } from '../../store/snackbar/snackbar.selector'
import { closeSnackbar as closeSnackbarAction } from '../../store/snackbar/snackbar.slice'

const UseSnackbar = () => {
  const dispatch = useDispatch()
  const currentSnackbars = useSelector(getSnackbars)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    currentSnackbars.forEach((snack) => {
      enqueueSnackbar(snack.message, {
        variant: snack.variant,
        preventDuplicate: true,
        autoHideDuration: snack.autoHideDuration ?? 5000,
        onClose: () => {
          dispatch(closeSnackbarAction(snack.id))
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      })
    })
  }, [currentSnackbars, dispatch, enqueueSnackbar])

  return null
}

export const RootSnackbar = () => {
  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
      <UseSnackbar />
    </SnackbarProvider>
  )
}
