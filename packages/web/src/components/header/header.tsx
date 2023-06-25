import React from 'react'
import { useDispatch } from 'react-redux'
import { useAddNewClientMutation } from '../../store/clients/clients.api'
import { updateClientsSearch } from '../../store/clients/clients.slice'
import { randomName } from '../../util/random-name'
import { Button } from '../button/button'
import { SearchInput } from '../search-input/search-input'
import styles from './header.module.scss'

export const Header = () => {
  const dispatch = useDispatch()
  const [addNewClient, { isLoading }] = useAddNewClientMutation()

  const onAddNewClient = () => {
    addNewClient({ name: randomName(), addedAt: new Date().toUTCString() })
  }

  const onSearch = (value: string) => {
    dispatch(updateClientsSearch(value))
  }

  return (
    <div className={styles.header}>
      <Button variant="primary" onClick={onAddNewClient} disabled={isLoading}>
        {isLoading ? 'Preparing client...' : 'New client'}
      </Button>
      <SearchInput onChange={onSearch} />
    </div>
  )
}
