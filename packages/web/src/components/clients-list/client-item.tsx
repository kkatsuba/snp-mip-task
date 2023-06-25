import React from 'react'
import { useRemoveClientMutation } from '../../store/clients/clients.api'
import { ClientResponse } from '../../types/client'
import { AccordionButton, AccordionHeader, AccordionItem, AccordionPanel } from '../accordion'
import { AccordionIcon } from '../accordion/accordion-icon'
import { Button } from '../button/button'

type Props = ClientResponse

export const ClientItem = (props: Props) => {
  const { id, name, addedAt } = props
  const [removeClient, { isLoading }] = useRemoveClientMutation()

  return (
    <AccordionItem>
      <AccordionHeader>
        <AccordionIcon />
        <AccordionButton>
          {name} ({addedAt})
        </AccordionButton>
        <Button
          variant="ghost"
          title="Delete client"
          onClick={() => removeClient(id)}
          disabled={isLoading}
        >
          ❌
        </Button>
      </AccordionHeader>
      <AccordionPanel>TODO</AccordionPanel>
    </AccordionItem>
  )
}
