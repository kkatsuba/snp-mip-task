import { Box } from '@chakra-ui/react'
import React from 'react'
import { Header } from './components/header/header'

export const App = () => {
  return (
    <Box maxW={1000} mx="auto" my={50}>
      <Header />
    </Box>
  )
}
