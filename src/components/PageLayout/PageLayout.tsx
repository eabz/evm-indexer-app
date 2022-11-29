import { Text, VStack } from '@chakra-ui/layout'

import { SearchBar } from '../SearchBar'

export const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <VStack align="center" justifyContent="center" marginTop="2" width="full">
      <Text fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
        EVM Indexer
      </Text>
      <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
        Minimalistic EVM compatible chain indexer
      </Text>

      <SearchBar />
      {children}
    </VStack>
  )
}
