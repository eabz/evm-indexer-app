import { NextApiRequest, NextApiResponse } from 'next'

import { getBlocks } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { Block } from '@/types/models/Block'

/**
 * @swagger
 * /api/block/{number}:
 *   get:
 *     tags: [Blockchain Data]
 *     parameters:
 *     - in: path
 *       name: number
 *       schema:
 *          type: number
 *       required: true
 *       description: Height number of the block to fetch
 *     responses:
 *       200:
 *         description: An array with the information for the requested block for all chains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Block'
 */

export default async function async(req: NextApiRequest, res: NextApiResponse<Block[]>) {
  const number = req.query.number as string

  const data = await getApiBlock(parseInt(number))

  res.json(data)
}

export const getApiBlock = async (number: number): Promise<Block[]> => {
  const [{ blocks }] = await Promise.all([getBlocks(number, {}, HASURA_HEADERS)])

  return blocks.map((block) => ({
    ...block,
    txs_hash: block.txs_hash.map((tx) => tx.hash),
  }))
}
