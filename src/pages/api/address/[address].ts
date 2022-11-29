import { NextApiRequest, NextApiResponse } from 'next'

import { ApiAddressInfo } from '@/types'

export default async function async(req: NextApiRequest, res: NextApiResponse) {
  const address = req.query.address as string

  const data = await getApiAddress(address)

  res.json(data)
}

export const getApiAddress = async (address: string): Promise<ApiAddressInfo> => {
  console.log(address)
  return { txs: 0 }
}
