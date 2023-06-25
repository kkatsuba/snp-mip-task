import React from 'react'
import styles from './loader.module.scss'

export const Loader = () => {
  return (
    <svg className={styles.loader} viewBox="0 0 100 100">
      <circle className={styles.track} cx="50" cy="50" r="42" strokeWidth="10px"></circle>
      <circle className={styles.progress} cx="50" cy="50" r="42" strokeWidth="10px"></circle>
    </svg>
  )
}
