import React from 'react'
import styles from './app.module.scss'
import { ClientsList } from './components/clients-list/clients-list'
import { Header } from './components/header/header'

export const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <ClientsList />
    </div>
  )
}
