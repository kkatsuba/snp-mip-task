import React from 'react'
import styles from './app.module.scss'
import { Header } from './components/header/header'

export const App = () => {
  return (
    <div className={styles.container}>
      <Header />
    </div>
  )
}
