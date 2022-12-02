import { Box, Text, VStack } from '@chakra-ui/layout'
import Link from 'next/link'

import { SearchBar } from '../SearchBar'

export const PageLayout = ({ children, isHome = true }: { children: JSX.Element; isHome?: boolean }) => {
  return (
    <VStack align="center" justifyContent="center" marginTop="2" width="full">
      <Text fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
        <Link href="/">EVM Indexer</Link>
      </Text>
      <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
        Minimalistic EVM compatible chain indexer
      </Text>

      <SearchBar />

      <Box>
        <Link href={isHome ? '/api-doc' : '/'}>
          <Text color="blue.700" cursor="pointer" textDecoration="underline">
            {isHome ? 'API documentation' : 'Home Page'}
          </Text>
        </Link>
      </Box>
      <Box width="full">{children}</Box>
    </VStack>
  )
}
