import React, { isValidElement } from 'react'
import { Input } from './input'
import { InputRightElement } from './input-left-element'
import styles from './input.module.scss'

export const InputGroup = (props: React.PropsWithChildren) => {
  const { children } = props
  const validChildren = React.Children.toArray(children).filter(isValidElement)
  const rightElement = validChildren.find((child) => child.type === InputRightElement)
  const clones = validChildren.map((child: any) => {
    if (child.type === Input && rightElement) {
      return React.cloneElement(child, { className: styles.withRightIcon })
    }

    return child
  })

  return <div className={styles.inputGroup}>{clones}</div>
}
