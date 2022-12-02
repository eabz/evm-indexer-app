import { VStack } from '@chakra-ui/layout'
import { GetServerSidePropsContext } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { Tx } from '@/components/Tx'
import { Tx as TxInfo } from '@/types/models/Transaction'

import { getApiTransaction } from '../api/tx/[hash]'

export default function TxPage({ txInfo }: { txInfo: TxInfo[] }) {
  return (
    <PageLayout>
      <VStack>
        {txInfo.map((tx) => (
          <Tx key={`Tx_${tx.hash}-${tx.chain}`} txInfo={tx} />
        ))}
      </VStack>
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
