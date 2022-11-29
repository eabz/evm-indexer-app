import { GetServerSidePropsContext } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { ApiBlockInfo } from '@/types'

import { getApiBlock } from '../api/block/[number]'

export default function BlockPage({ blocks }: { blocks: ApiBlockInfo[] }) {
  return (
    <PageLayout>
      <div />
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
