import { GetServerSidePropsContext } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { ApiTxInfo } from '@/types'

import { getApiTransaction } from '../api/tx/[hash]'

export default function TxPage({ txInfo }: { txInfo: ApiTxInfo[] }) {
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

  const txInfo = await getApiTransaction(hash as string)

  return {
    props: { txInfo },
  }
}
