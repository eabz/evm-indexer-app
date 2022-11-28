import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { ApiChainInfo } from '@/types'

const handler = async (_req: NextApiRequest, res: NextApiResponse<ApiChainInfo[]>) => {
  const { state } = await getChainBlocks({}, HASURA_HEADERS)

  const chainInfo = state.map((chain) => ({ chain: chain.chain, indexed_block: chain.blocks, last_block: 0 }))

  res.json(chainInfo)
}

export default handler
