import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { chainById } from '@/lib/chains'
import { ChainInfo } from '@/types/models/ChainInfo'

/**
 * @swagger
 * /api/chains:
 *   get:
 *     tags: [Chain Information]
 *     responses:
 *       200:
 *         description: An array with all the chains being indexed and their sync status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/ChainInfo'
 */

const handler = async (_req: NextApiRequest, res: NextApiResponse<ChainInfo[]>) => {
  const { state } = await getChainBlocks({}, HASURA_HEADERS)

  const chainsInfo: ChainInfo[] = []

  for (const { chain, blocks } of state) {
    const chainInfo = chainById[chain]
    if (!chainInfo) continue

    const provider = new ethers.providers.JsonRpcProvider(chainInfo.rpcUrl, chainInfo.chainId)

    const lastBlock = await provider.getBlockNumber()

    chainsInfo.push({ chain, indexed_block: blocks, last_block: lastBlock })
  }

  res.json(chainsInfo)
}

export default handler
