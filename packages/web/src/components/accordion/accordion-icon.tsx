import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '../../icons'
import { useAccordionItemContext } from './accordion-item.context'

export const AccordionIcon = () => {
  const { isOpened } = useAccordionItemContext()
  return isOpened ? <ChevronDownIcon /> : <ChevronUpIcon />
}
