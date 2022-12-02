import request from 'graphql-request'

import { IndexerBlock, IndexerChainInfo, IndexerTokenTransfer, IndexerTransaction } from '@/types'

import {
  getAddressContractInteractionsQuery,
  getAddressTokensQuery,
  getBlockQuery,
  getChainBlocksQuery,
  getChainsQuery,
  getChainTokensQuery,
  getTokenFromAddressAndChainQuery,
  getTokensCountForChainQuery,
  getTransactionHistoryQuery,
  getTransactionQuery,
} from './queries'

export const indexer_graph = async (query: string, variables = {}, headers = {}) =>
  request('https://indexer.kindynos.mx/v1/graphql', query, variables, headers)

export const getChainBlocks = async (variables = {}, headers = {}): Promise<{ state: IndexerChainInfo[] }> => {
  return await indexer_graph(getChainBlocksQuery(), variables, headers)
}

export const getChains = async (variables = {}, headers = {}) => {
  return await indexer_graph(getChainsQuery(), variables, headers)
}

export const getTokensCountForChain = async (chain: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTokensCountForChainQuery(chain), variables, headers)
}

export const getTokenFromAddressAndChain = async (address: string, chain: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTokenFromAddressAndChainQuery(address.toLowerCase(), chain), variables, headers)
}

export const getChainTokens = async (chain: string, limit: number, offset: number, variables = {}, headers = {}) => {
  return await indexer_graph(getChainTokensQuery(chain, limit, offset), variables, headers)
}

export const getBlocks = async (number: number, variables = {}, headers = {}): Promise<{ blocks: IndexerBlock[] }> => {
  return await indexer_graph(getBlockQuery(number), variables, headers)
}

export const getTransaction = async (
  hash: string,
  variables = {},
  headers = {},
): Promise<{ txs: IndexerTransaction[] }> => {
  return await indexer_graph(getTransactionQuery(hash), variables, headers)
}

export const getTransactionHistory = async (
  address: string,
  limit: number,
  offset: number,
  variables = {},
  headers = {},
): Promise<{ txs: IndexerTransaction[] }> => {
  return await indexer_graph(getTransactionHistoryQuery(address.toLowerCase(), limit, offset), variables, headers)
}

export const getAddressUniqueTokens = async (
  address: string,
  variables = {},
  headers = {},
): Promise<{ token_transfers: IndexerTokenTransfer[] }> => {
  return await indexer_graph(getAddressTokensQuery(address.toLowerCase()), variables, headers)
}

export const getAddressUniqueContractInteractions = async (
  address: string,
  variables = {},
  headers = {},
): Promise<{ contract_interactions: { contract: string }[] }> => {
  return await indexer_graph(getAddressContractInteractionsQuery(address.toLowerCase()), variables, headers)
}
