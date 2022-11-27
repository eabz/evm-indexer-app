import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks, getChains } from '@/graph/fetcher'
import { IndexerChainInfo } from '@/types'

const headers = {
  'x-hasura-admin-secret': process.env.HASURA_KEY,
}

export default async function async(_req: NextApiRequest, res: NextApiResponse<IndexerChainInfo[]>) {
  const chains = (await getChains({}, headers)).state

  const status = []

  for (let i = 0; i < chains.length; i++) {
    const blocks = await getChainBlocks(chains[i].chain, {}, headers)
    status.push({ chain: chains[i], last_indexed_block: blocks.blocks_aggregate.aggregate.count })
  }

  res.json(status)
}
