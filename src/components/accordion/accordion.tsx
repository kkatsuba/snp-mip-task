import React from 'react'
import styles from './accordion.module.scss'

export const Accordion = (props: React.PropsWithChildren) => {
  const { children } = props
  return <div className={styles.accordion}>{children}</div>
}
