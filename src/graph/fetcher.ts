import request from 'graphql-request'

import { IndexerChainInfo } from '@/types'

import { getChainBlocksQuery, getChainsQuery, getChainTokensQuery, getTokensCountForChainQuery } from './queries'

export const indexer_graph = async (query: string, variables = {}, headers = {}) =>
  request('https://indexer.kindynos.mx/v1/graphql', query, variables, headers)

export const getChains = async (variables = {}, headers = {}) => {
  return await indexer_graph(getChainsQuery(), variables, headers)
}

export const getChainBlocks = async (variables = {}, headers = {}): Promise<{ state: IndexerChainInfo[] }> => {
  return await indexer_graph(getChainBlocksQuery(), variables, headers)
}

export const getChainTokens = async (chain: string, limit?: string, offset?: string, variables = {}, headers = {}) => {
  return await indexer_graph(getChainTokensQuery(chain, limit, offset), variables, headers)
}

export const getTokensCounrForChain = async (chain: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTokensCountForChainQuery(chain), variables, headers)
}
