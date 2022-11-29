import { Box, Stack } from '@chakra-ui/layout'

import { ApiBlockInfo } from '@/types'

export const Block = ({ blockInfo }: { blockInfo: ApiBlockInfo }) => {
  return (
    <Stack align="center" justifyContent="center" marginTop="2" width="full">
      <Box>Block: {blockInfo.number}</Box>
    </Stack>
  )
}
