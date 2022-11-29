import { NextApiRequest, NextApiResponse } from 'next'

import { getTransaction, getTransactionLogs } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { ApiTxInfo } from '@/types'

export default async function async(req: NextApiRequest, res: NextApiResponse) {
  const hash = req.query.hash as string

  const data = await getApiTransaction(hash)

  res.json(data)
}

export const getApiTransaction = async (hash: string): Promise<ApiTxInfo[]> => {
  const [{ txs_receipts }, { logs }] = await Promise.all([
    getTransaction(hash, {}, HASURA_HEADERS),
    getTransactionLogs(hash, {}, HASURA_HEADERS),
  ])

  return txs_receipts.map((tx, i) => {
    const txInfo: ApiTxInfo = { ...tx }
    const txLogs = logs[i]
    if (txLogs) {
      txInfo.log = txLogs
    }
    return txInfo
  })
}
