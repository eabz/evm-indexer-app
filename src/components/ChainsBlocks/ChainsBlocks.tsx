import { Box, Flex, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import NextImage from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { chainById, IChainInfo } from '@/lib/chains'
import { ApiChainInfo } from '@/types'

const ChainPanel = ({
  chain,
  last_block,
  indexed_block,
}: {
  chain: IChainInfo
  indexed_block: number
  last_block: number
}) => {
  return (
    <Box
      border="1px solid"
      borderColor="inherit"
      borderRadius="md"
      margin="5"
      maxWidth="300px"
      padding="5"
      width="full"
    >
      <VStack alignContent="center" justifyContent="center">
        <Text fontSize="sm" fontWeight="bold" marginBottom="2">
          {chain.name}
        </Text>
        <Box>
          <NextImage height="40px" src={`/static/chains/${chain.logoUrl}`} width="40px" />
        </Box>
        <Box>
          <Text fontSize="sm" textAlign="center">
            Last Block
          </Text>
          <Text fontSize="sm" textAlign="center">
            {last_block}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" textAlign="center">
            Indexed Blocks
          </Text>
          <Text fontSize="sm" textAlign="center">
            {indexed_block}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

export const ChainsBlocks = () => {
  const [isLoading, setLoading] = useState(true)

  const [chainsInfo, setChainsInfo] = useState<ApiChainInfo[] | undefined>(undefined)

  const fetchData = useCallback(async () => {
    const data = await fetch('/api/chains')
    const chains = await data.json()
    setChainsInfo(chains)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Stack py="5" width="full">
      {isLoading ? (
        <HStack align="center" justifyContent="center">
          <Spinner size="xl" />
        </HStack>
      ) : (
        <Flex flexDirection="row" justifyContent="center" width="full">
          <SimpleGrid columns={{ base: 1, md: 2 }} maxWidth="500px" spacingX="5" width="full">
            {chainsInfo &&
              chainsInfo.map((chainInfo) => (
                <HStack key={`ChainInfo_${chainInfo.chain}`} justifyContent="center">
                  <ChainPanel
                    chain={chainById[chainInfo.chain]}
                    indexed_block={chainInfo.indexed_block}
                    last_block={chainInfo.last_block}
                  />
                </HStack>
              ))}
          </SimpleGrid>
        </Flex>
      )}
    </Stack>
  )
}
