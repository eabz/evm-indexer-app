import request from 'graphql-request'

import { getChainBlocksQuery } from './queries'

export const indexer_graph = async (query: string, variables = {}, headers = {}) =>
  request('https://indexer.kindynos.mx/v1/graphql', query, variables, headers)

export const getChainBlocks = async (
  chain: string,
  variables = {},
  headers = {},
): Promise<{ blocks_aggregate: { aggregate: { count: number } }; chain: string }> => {
  const res = await indexer_graph(getChainBlocksQuery(chain), variables, headers)
  return { ...res, chain }
}
