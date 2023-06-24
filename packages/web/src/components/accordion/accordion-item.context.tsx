import React, { useCallback, useContext, useState } from 'react'

interface AccordionItemContextValue {
  isOpened: boolean
  onChange: () => void
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined)

export const AccordionItemProvider = (props: React.PropsWithChildren) => {
  const [isOpened, setIsOpened] = useState(false)
  const onChange = useCallback(() => setIsOpened((x) => !x), [])

  return (
    <AccordionItemContext.Provider value={{ isOpened, onChange }}>
      {props.children}
    </AccordionItemContext.Provider>
  )
}

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('useAccordionItemContext called outside AccordionItemProvider')
  }

  return context
}
