import { GetServerSidePropsContext } from 'next'

import { PageLayout } from '@/components/PageLayout'

import { getApiAddress } from '../api/address/[address]'

export default function AddressPage() {
  return (
    <PageLayout>
      <div />
    </PageLayout>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const address = params?.address
  if (!address) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  }

  const addressInfo = await getApiAddress(address as string)

  return {
    props: { addressInfo },
  }
}
