import React from 'react'
import styles from './input.module.scss'

export const InputRightElement = (props: React.PropsWithChildren) => {
  const { children } = props
  return <div className={styles.inputLeftElement}>{children}</div>
}
