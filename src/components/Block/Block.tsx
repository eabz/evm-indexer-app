import { Box, Stack } from '@chakra-ui/layout'

import { Block as BlockInfo } from '@/types/models/Block'

export const Block = ({ blockInfo }: { blockInfo: BlockInfo }) => {
  return (
    <Stack align="center" justifyContent="center" marginTop="2" width="full">
      <Box>Block: {blockInfo.number}</Box>
    </Stack>
  )
}
