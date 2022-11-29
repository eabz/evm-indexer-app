import { NextApiRequest, NextApiResponse } from 'next'

import { getBlocks, getTransactionForBlock } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { ApiBlockInfo } from '@/types'

export default async function async(req: NextApiRequest, res: NextApiResponse<ApiBlockInfo[]>) {
  const number = req.query.number as string

  const data = await getApiBlock(parseInt(number))

  res.json(data)
}

export const getApiBlock = async (number: number): Promise<ApiBlockInfo[]> => {
  const [{ blocks }, { txs }] = await Promise.all([
    getBlocks(number, {}, HASURA_HEADERS),
    getTransactionForBlock(number, {}, HASURA_HEADERS),
  ])

  return blocks.map((block) => ({
    ...block,
    txs_hash: txs.filter((tx) => tx.chain === block.chain).map((tx) => tx.hash),
  }))
}
