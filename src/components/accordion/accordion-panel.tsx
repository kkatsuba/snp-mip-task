import React from 'react'
import { useAccordionItemContext } from './accordion-item.context'
import styles from './accordion.module.scss'

export const AccordionPanel = (props: React.PropsWithChildren) => {
  const { children } = props
  const { isOpened } = useAccordionItemContext()
  return isOpened ? <div className={styles.accordionPanel}>{children}</div> : null
}
