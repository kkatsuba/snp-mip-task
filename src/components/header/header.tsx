import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'

export const Header = () => {
  return (
    <HStack justify="space-between">
      <Button>New client</Button>
      <Box w="50%">
        <InputGroup>
          <Input placeholder="Client search" />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </Box>
    </HStack>
  )
}
