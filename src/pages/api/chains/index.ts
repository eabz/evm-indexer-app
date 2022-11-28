import { NextApiRequest, NextApiResponse } from 'next'

import { getChainBlocks } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { state } = await getChainBlocks({}, HASURA_HEADERS)

  res.json(state)
}

export default handler
