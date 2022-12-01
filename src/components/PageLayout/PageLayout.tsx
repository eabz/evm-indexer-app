import { Box, Text, VStack } from '@chakra-ui/layout'
import Link from 'next/link'

import { SearchBar } from '../SearchBar'

export const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <VStack align="center" justifyContent="center" marginTop="2" width="full">
      <Text fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
        <Link href="/">EVM Indexer</Link>
      </Text>
      <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
        Minimalistic EVM compatible chain indexer
      </Text>

      <SearchBar />
      <Box width="full">{children}</Box>
    </VStack>
  )
}
