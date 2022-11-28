import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks, getChains } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { IndexerChainInfo } from '@/types'

export default async function async(_req: NextApiRequest, res: NextApiResponse<IndexerChainInfo[]>) {
  const chains = (await getChains({}, HASURA_HEADERS)).state

  const status = []

  for (let i = 0; i < chains.length; i++) {
    const blocks = await getChainBlocks(chains[i].chain, {}, HASURA_HEADERS)
    status.push({ chain: chains[i].chain, last_indexed_block: blocks.blocks_aggregate.aggregate.count })
  }

  res.json(status)
}
