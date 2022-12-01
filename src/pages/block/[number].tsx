import { VStack } from '@chakra-ui/layout'
import { GetServerSidePropsContext } from 'next'

import { Block } from '@/components/Block'
import { PageLayout } from '@/components/PageLayout'
import { Block as BlockInfo } from '@/types/models/Block'

import { getApiBlock } from '../api/block/[number]'

export default function BlockPage({ blocks }: { blocks: BlockInfo[] }) {
  return (
    <PageLayout>
      <VStack>
        {blocks.map((block) => (
          <Block key={`Block_${block.number}-${block.chain}`} blockInfo={block} />
        ))}
      </VStack>
    </PageLayout>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const number = params?.number
  if (!number) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  }

  const blocks = await getApiBlock(parseInt(number as string))

  return {
    props: { blocks },
  }
}
