import classNames from 'classnames'
import React from 'react'
import styles from './button.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'primary' | 'secondary' | 'ghost'
  colorScheme?: 'blue' | 'red'
}

export const Button = (props: Props) => {
  const { colorScheme = 'blue', variant, className, ...rest } = props
  const buttonClass = classNames(className, styles.button, styles[variant], styles[colorScheme])

  return <button className={buttonClass} {...rest} />
}
