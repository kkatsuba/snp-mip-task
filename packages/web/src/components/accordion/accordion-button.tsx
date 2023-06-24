import React from 'react'
import { useAccordionItemContext } from './accordion-item.context'
import styles from './accordion.module.scss'

export const AccordionButton = (props: React.PropsWithChildren) => {
  const { children } = props
  const { onChange } = useAccordionItemContext()

  return (
    <button className={styles.accordionHeaderButton} onClick={onChange}>
      {children}
    </button>
  )
}
