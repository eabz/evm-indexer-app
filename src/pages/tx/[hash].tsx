import { GetServerSidePropsContext } from 'next'

import { PageLayout } from '@/components/PageLayout'

import { getApiTransaction } from '../api/tx/[hash]'

export default function TxPage() {
  return (
    <PageLayout>
      <div />
    </PageLayout>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const hash = params?.hash
  if (!hash) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  }

  const data = await getApiTransaction(hash as string)

  return {
    props: {},
  }
}
