import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { chainById, chains } from '@/lib/chains'
import { ChainInfo } from '@/types/models/ChainInfo'

const handler = async (_req: NextApiRequest, res: NextApiResponse<ChainInfo[]>) => {
  const chainsInfo: ChainInfo[] = []

  const chainsReq = chains.map((chain) => getChainBlocks(chain.id, {}, HASURA_HEADERS))

  const responses = await Promise.all(chainsReq)

  for (const { chain, blocks_aggregate } of responses) {
    const chainData = chainById[chain]

    const provider = new ethers.providers.JsonRpcProvider(chainData.rpcUrl, chainData.chainId)

    const lastBlock = await provider.getBlockNumber()

    chainsInfo.push({
      chain: chainData.id,
      indexed_block: blocks_aggregate.aggregate.count,
      last_block: lastBlock,
    })
  }

  res.json(chainsInfo)
}

export default handler
