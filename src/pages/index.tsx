import { Input } from '@chakra-ui/input'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'

import { ChainsBlocks } from '@/components/ChainsBlocks'

export default function Home() {
  return (
    <VStack align="center" justifyContent="center" marginTop="2" width="full">
      <Text fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
        EVM Indexer
      </Text>
      <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
        Minimalistic EVM compatible chain indexer
      </Text>
      <HStack justifyContent="center" px="5" py="2" width="full">
        <Input
          fontSize="sm"
          placeholder="Search by Address / Block / Transaction / Contract"
          textAlign="center"
          width={{ base: 'full', md: '400px', lg: '600px' }}
        />
      </HStack>
      <Box width="full">
        <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
          Chains Indexed
        </Text>
        <ChainsBlocks />
      </Box>
    </VStack>
  )
}
