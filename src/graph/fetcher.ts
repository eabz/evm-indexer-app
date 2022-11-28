import request from 'graphql-request'

import { getChainBlocksQuery, getChainsQuery, getChainTokensQuery } from './queries'

export const indexer_graph = async (query: string, variables = {}, headers = {}) =>
  request('https://indexer.kindynos.mx/v1/graphql', query, variables, headers)

export const getChains = async (variables = {}, headers = {}) => {
  return await indexer_graph(getChainsQuery(), variables, headers)
}

export const getChainBlocks = async (chain: string, variables = {}, headers = {}) => {
  return await indexer_graph(getChainBlocksQuery(chain), variables, headers)
}

export const getChainTokens = async (chain: string, variables = {}, headers = {}) => {
  return await indexer_graph(getChainTokensQuery(chain), variables, headers)
}
