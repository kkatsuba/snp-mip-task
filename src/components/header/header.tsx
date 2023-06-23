import React from 'react'
import { Button } from '../button/button'
import styles from './header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <Button variant="primary">New client</Button>
      <input />
    </div>
  )
}
