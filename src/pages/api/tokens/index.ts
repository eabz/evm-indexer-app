import { NextApiRequest, NextApiResponse } from 'next'

import { getChains, getTokensCountForChain } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { ApiChainTokens } from '@/types'

const handler = async (_req: NextApiRequest, res: NextApiResponse<ApiChainTokens[]>) => {
  const { state } = await getChains({}, HASURA_HEADERS)

  const tokens: { chain: string; count: number }[] = []

  for (const { chain } of state) {
    const { tokens_aggregate } = await getTokensCountForChain(chain, {}, HASURA_HEADERS)
    tokens.push({ chain, count: tokens_aggregate.aggregate.count })
  }

  res.json(tokens)
}

export default handler
