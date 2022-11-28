import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { IndexerChainInfo } from '@/types'

export default async function async(_req: NextApiRequest, res: NextApiResponse<IndexerChainInfo[]>) {
  const state = await getChainBlocks({}, HASURA_HEADERS)

  res.json(state.state)
}
