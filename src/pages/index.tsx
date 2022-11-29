import { Box, Text } from '@chakra-ui/layout'

import { ChainsBlocks } from '@/components/ChainsBlocks'
import { PageLayout } from '@/components/PageLayout'

export default function Home() {
  return (
    <PageLayout>
      <Box width="full">
        <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
          Chains Indexed
        </Text>
        <ChainsBlocks />
      </Box>
    </PageLayout>
  )
}
