import React from 'react'
import { AccordionItemProvider } from './accordion-item.context'
import styles from './accordion.module.scss'

export const AccordionItem = (props: React.PropsWithChildren) => {
  const { children } = props

  return (
    <AccordionItemProvider>
      <div className={styles.accordionItem}>{children}</div>
    </AccordionItemProvider>
  )
}
