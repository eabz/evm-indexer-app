import request from 'graphql-request'

import { IndexerChainInfo } from '@/types'

import { getChainBlocksQuery } from './queries'

export const indexer_graph = async (query: string, variables = {}, headers = {}) =>
  request('https://indexer.kindynos.mx/v1/graphql', query, variables, headers)

export const getChainBlocks = async (variables = {}, headers = {}): Promise<{ state: IndexerChainInfo[] }> => {
  return await indexer_graph(getChainBlocksQuery(), variables, headers)
}
