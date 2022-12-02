import { Box, Stack } from '@chakra-ui/layout'

import { Transaction } from '@/types/models/Transaction'

export const Tx = ({ txInfo }: { txInfo: Transaction }) => {
  return (
    <Stack align="center" justifyContent="center" marginTop="2" width="full">
      <Box>Transaction: {txInfo.hash}</Box>
    </Stack>
  )
}
