import { GetServerSidePropsContext } from 'next'

import { PageLayout } from '@/components/PageLayout'

import { getApiBlock } from '../api/block/[number]'

export default function BlockPage() {
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

  const data = await getApiBlock(parseInt(number as string))

  return {
    props: {},
  }
}
