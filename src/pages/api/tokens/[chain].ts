import { Redis } from '@upstash/redis'
import { NextApiRequest, NextApiResponse } from 'next'

import { getChainTokens } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { CmcToken, CoingeckoToken, IndexerToken } from '@/types/token'

type ApiResponseToken = IndexerToken & { coingecko_id?: string; cmc_id?: string }

const COINGECKO_TOKENS_KEY = 'coingecko_tokens'
const CMC_TOKENS_KEY = 'cmc_tokens'

const CACHE_TIME = 60 * 60 * 12 // 12 hours.

export default async function async(req: NextApiRequest, res: NextApiResponse<ApiResponseToken[]>) {
  const redis = Redis.fromEnv()

  let coinGeckoTokens = await redis.get<CoingeckoToken[]>(COINGECKO_TOKENS_KEY)

  if (!coinGeckoTokens) {
    coinGeckoTokens = await getCoinGeckoTokens()

    await redis.set(COINGECKO_TOKENS_KEY, coinGeckoTokens, { ex: CACHE_TIME })
  }

  let cmcTokens = await redis.get<CmcToken[]>(CMC_TOKENS_KEY)

  if (!cmcTokens) {
    cmcTokens = await getCoinMarketCapTokens()

    await redis.set(CMC_TOKENS_KEY, cmcTokens, { ex: CACHE_TIME })
  }

  const tokens: { tokens: IndexerToken[] } = await getChainTokens(req.query.chain as string, {}, HASURA_HEADERS)

  const tokensMerged = tokens.tokens.map((token: IndexerToken) => {
    const coinGeckoTokenId = coinGeckoTokens?.find(
      (coinGeckoToken) => coinGeckoToken.symbol === token.symbol.toLowerCase(),
    )
    const cmcTokenId = cmcTokens?.find((cmcToken) => cmcToken.symbol === token.symbol)

    return { ...token, coingecko_id: coinGeckoTokenId?.id, cmc_id: cmcTokenId?.slug }
  })

  res.json(tokensMerged)
}

async function getCoinGeckoTokens(): Promise<CoingeckoToken[]> {
  try {
    const res: Response = await fetch('https://api.coingecko.com/api/v3/coins/list')

    if (res.status !== 200) {
      return []
    }

    const tokens: CoingeckoToken[] = await res.json()

    return tokens
  } catch (_) {
    return []
  }
}

async function getCoinMarketCapTokens(): Promise<CmcToken[]> {
  try {
    const headers = new Headers({
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY || '',
    })

    const res: Response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
      method: 'GET',
      headers: headers,
    })

    if (res.status !== 200) {
      return []
    }

    const tokens: { data: CmcToken[] } = await res.json()

    return tokens.data
  } catch (_) {
    return []
  }
}
