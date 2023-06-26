import React from 'react'
import { useRemoveClientMutation } from '../../store/clients/clients.api'
import { ClientResponse } from '../../types/client'
import { AccordionButton, AccordionHeader, AccordionItem, AccordionPanel } from '../accordion'
import { AccordionIcon } from '../accordion/accordion-icon'
import { Button } from '../button/button'
import { ClientPanel } from '../client-panel/client-panel'

type Props = ClientResponse

export const ClientItem = (props: Props) => {
  const { id, name, addedAt } = props
  const [removeClient, { isLoading }] = useRemoveClientMutation()

  return (
    <AccordionItem>
      <AccordionHeader>
        <AccordionIcon />
        <AccordionButton>
          #{id} {name} ({addedAt})
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
      <AccordionPanel>
        <ClientPanel {...props} />
      </AccordionPanel>
    </AccordionItem>
  )
}
