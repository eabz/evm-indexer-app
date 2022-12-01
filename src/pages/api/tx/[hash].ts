import { NextApiRequest, NextApiResponse } from 'next'

import { getTransaction, getTransactionLogs } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { Tx } from '@/types/models/Tx'

/**
 * @swagger
 * /api/tx/{hash}:
 *   get:
 *     tags: [Transactions]
 *     parameters:
 *     - in: path
 *       name: hash
 *       schema:
 *          type: string
 *       required: true
 *       description: Hash of the transaction to fetch
 *     responses:
 *       200:
 *         description: An array with the information of the transaction hash for all chains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Tx'
 */

export default async function async(req: NextApiRequest, res: NextApiResponse<Tx[]>) {
  const hash = req.query.hash as string

  const data = await getApiTransaction(hash)

  res.json(data)
}

export const getApiTransaction = async (hash: string): Promise<Tx[]> => {
  const [{ txs_receipts }, { logs }] = await Promise.all([
    getTransaction(hash, {}, HASURA_HEADERS),
    getTransactionLogs(hash, {}, HASURA_HEADERS),
  ])

  return txs_receipts.map((tx, i) => {
    const txInfo: Tx = { ...tx }
    const txLogs = logs[i]
    if (txLogs) {
      txInfo.log = txLogs
    }
    return txInfo
  })
}
