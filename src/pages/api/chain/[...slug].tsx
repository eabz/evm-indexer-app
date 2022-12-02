import { Redis } from '@upstash/redis'
import { NextApiRequest, NextApiResponse } from 'next'

import { getChainTokens, getTokenFromAddressAndChain } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { CmcToken, CoingeckoToken, IndexerToken } from '@/types'

const COINGECKO_TOKENS_KEY = 'coingecko_tokens'
const CMC_TOKENS_KEY = 'cmc_tokens'

const CACHE_TIME = 60 * 60 * 12 // 12 hours.

export default async function async(req: NextApiRequest, res: NextApiResponse) {
  const chain = req.query?.slug?.[0]
  const request = req.query?.slug?.[1]

  if (!chain) {
    res.status(500)
    res.json({ error: 'Invalid chain' })
    return
  }

  if (!request) {
    res.status(500)
    res.json({ error: 'Invalid request' })
    return
  }

  if (request !== 'token' && request !== 'tokens') {
    res.status(500)
    res.json({ error: 'Invalid request' })
    return
  }

  if (request === 'tokens') {
    const limit = req.query.limit as string
    const page = req.query.page as string
    await getChainTokensRequest(chain, limit, page, res)
    return
  }

  if (request === 'token') {
    let address = req.query.address as string
    address = address.replace(/['"]+/g, '')
    await getChainTokenRequest(address, chain, res)
    return
  }

  res.json({ success: true })
}

/**
 * @swagger
 * /api/chain/{chain}/tokens:
 *   get:
 *     tags: [Single Chain Information]
 *     parameters:
 *     - in: path
 *       name: chain
 *       schema:
 *          type: string
 *       required: true
 *       description: Slug of the chain to query
 *     - in: query
 *       name: limit
 *       schema:
 *          type: interger
 *       required: false
 *       description: Limit the amount of tokens to get
 *     - in: query
 *       name: page
 *       schema:
 *          type: interger
 *       required: false
 *       description: The page to fetch the tokens
 *     responses:
 *       200:
 *         description: An array of all the tokens with their metadata for the chain requested
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Token'
 */

async function getChainTokensRequest(chain: string, limit: string, page: string, res: NextApiResponse) {
  const redis = Redis.fromEnv()

  let coinGeckoTokens = await redis.get<CoingeckoToken[]>(COINGECKO_TOKENS_KEY)

  if (!coinGeckoTokens) {
    coinGeckoTokens = await getCoinGeckoTokens()

    const cleaned = coinGeckoTokens.map((token) => ({ symbol: token.symbol, id: token.id }))
    await redis.set(COINGECKO_TOKENS_KEY, cleaned, { ex: CACHE_TIME })
  }

  let cmcTokens = await redis.get<CmcToken[]>(CMC_TOKENS_KEY)

  if (!cmcTokens) {
    cmcTokens = await getCoinMarketCapTokens()

    const cleaned = cmcTokens.map((token) => ({ symbol: token.symbol, slug: token.slug }))
    await redis.set(CMC_TOKENS_KEY, cleaned, { ex: CACHE_TIME })
  }

  if (chain === 'ethereum') {
    chain = 'mainnet'
  }

  let limitNumber = limit ? parseInt(limit) : 1000

  if (limitNumber > 1000) {
    limitNumber = 1000
  }

  const offset = page && page !== '0' ? ((parseInt(page) - 1) * limitNumber).toFixed(0) : undefined

  const { tokens }: { tokens: IndexerToken[] } = await getChainTokens(
    chain,
    limitNumber,
    parseInt(offset ?? '0'),
    {},
    HASURA_HEADERS,
  )

  const tokensMerged = tokens.map((token: IndexerToken) => {
    const coinGeckoTokenId = coinGeckoTokens?.find(
      (coinGeckoToken) => coinGeckoToken.symbol === token.symbol.toLowerCase(),
    )
    const cmcTokenId = cmcTokens?.find((cmcToken) => cmcToken.symbol === token.symbol)

    return { ...token, coingecko_id: coinGeckoTokenId?.id, cmc_id: cmcTokenId?.slug }
  })

  res.json(tokensMerged)

  return
}

/**
 * @swagger
 * /api/chain/{chain}/token?address={address}:
 *   get:
 *     tags: [Single Chain Information]
 *     parameters:
 *     - in: path
 *       name: chain
 *       schema:
 *          type: string
 *       required: true
 *       description: Slug of the chain to query
 *     - in: query
 *       name: address
 *       schema:
 *          type: interger
 *       required: false
 *       description: Address of the token to fetch the information
 *     responses:
 *       200:
 *         description: An array containing just the token that matches the address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Token'
 */
async function getChainTokenRequest(address: string, chain: string, res: NextApiResponse) {
  const redis = Redis.fromEnv()

  let coinGeckoTokens = await redis.get<CoingeckoToken[]>(COINGECKO_TOKENS_KEY)

  if (!coinGeckoTokens) {
    coinGeckoTokens = await getCoinGeckoTokens()

    const cleaned = coinGeckoTokens.map((token) => ({ symbol: token.symbol, id: token.id }))
    await redis.set(COINGECKO_TOKENS_KEY, cleaned, { ex: CACHE_TIME })
  }

  let cmcTokens = await redis.get<CmcToken[]>(CMC_TOKENS_KEY)

  if (!cmcTokens) {
    cmcTokens = await getCoinMarketCapTokens()

    const cleaned = cmcTokens.map((token) => ({ symbol: token.symbol, slug: token.slug }))
    await redis.set(CMC_TOKENS_KEY, cleaned, { ex: CACHE_TIME })
  }

  if (chain === 'ethereum') {
    chain = 'mainnet'
  }

  const { tokens }: { tokens: IndexerToken[] } = await getTokenFromAddressAndChain(address, chain, {}, HASURA_HEADERS)

  const tokensMerged = tokens.map((token: IndexerToken) => {
    const coinGeckoTokenId = coinGeckoTokens?.find(
      (coinGeckoToken) => coinGeckoToken.symbol === token.symbol.toLowerCase(),
    )
    const cmcTokenId = cmcTokens?.find((cmcToken) => cmcToken.symbol === token.symbol)

    return { ...token, coingecko_id: coinGeckoTokenId?.id, cmc_id: cmcTokenId?.slug }
  })

  res.json(tokensMerged)

  return
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
