import { Box, Stack } from '@chakra-ui/layout'

import { ApiTxInfo } from '@/types'

export const Tx = ({ txInfo }: { txInfo: ApiTxInfo }) => {
  return (
    <Stack align="center" justifyContent="center" marginTop="2" width="full">
      <Box>Transaction: {txInfo.hash}</Box>
    </Stack>
  )
}
