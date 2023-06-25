import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useGetClientsQuery } from '../../store/clients/clients.api'
import { getClientSearch } from '../../store/clients/clients.selector'
import { Accordion } from '../accordion'
import { Loader } from '../loader/loader'
import { ClientItem } from './client-item'
import styles from './clients-list.module.scss'

export const ClientsList = () => {
  const search = useSelector(getClientSearch)
  const { data, isError, isFetching } = useGetClientsQuery()
  const clients = useMemo(
    () => data?.filter(({ name }) => name.toLowerCase().includes(search)),
    [data, search],
  )

  return (
    <div className={styles.clientsContainer}>
      {isError && <div>{`Houston, We've Got a Problem. Please take a try bit later`}</div>}
      {!isFetching && !clients?.length && (
        <div>{`No clients yet. Click the "New Client" button to proceed`}</div>
      )}
      {!isFetching && clients && (
        <Accordion>
          {clients.map((client) => (
            <ClientItem key={client.id} {...client} />
          ))}
        </Accordion>
      )}
      {isFetching && <Loader />}
    </div>
  )
}
