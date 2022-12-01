import { NextApiRequest, NextApiResponse } from 'next'

import { getChains, getTokensCountForChain } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { ChainTokens } from '@/types/models/ChainTokens'

/**
 * @swagger
 * /api/tokens:
 *   get:
 *     tags: [Chain Tokens]
 *     responses:
 *       200:
 *         description: An array with all the chains being indexed and the count of tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/ChainTokens'
 */

const handler = async (_req: NextApiRequest, res: NextApiResponse<ChainTokens[]>) => {
  const { state } = await getChains({}, HASURA_HEADERS)

  const tokens: { chain: string; count: number }[] = []

  for (const { chain } of state) {
    const { tokens_aggregate } = await getTokensCountForChain(chain, {}, HASURA_HEADERS)
    tokens.push({ chain, count: tokens_aggregate.aggregate.count })
  }

  res.json(tokens)
}

export default handler
