import React from 'react'
import styles from './accordion.module.scss'

export const AccordionHeader = (props: React.PropsWithChildren) => {
  const { children } = props
  return <h2 className={styles.accordionHeader}>{children}</h2>
}
