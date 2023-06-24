import classNames from 'classnames'
import React from 'react'
import styles from './input.module.scss'

interface Props
  extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size'
  > {
  size?: 'lg' | 'md' | 'sm'
}

export const Input = (props: Props) => {
  const { className, size = 'md', ...rest } = props
  const inputClass = classNames(className, styles.input, styles[size])

  return <input className={inputClass} {...rest} />
}
