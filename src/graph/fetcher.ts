import request from 'graphql-request'

import { IndexerChainInfo } from '@/types'

import {
  getBlockQuery,
  getChainBlocksQuery,
  getChainsQuery,
  getChainTokensQuery,
  getContractCreationsForAddressQuery,
  getReceivedTransactionsForAddressQuery,
  getSentTransactionsForAddressQuery,
  getTokenFromAddressQuery,
  getTokensCountForChainQuery,
  getTokenTransfersForAddressQuery,
  getTransactionLogsQuery,
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

export const getChainTokens = async (chain: string, limit?: string, offset?: string, variables = {}, headers = {}) => {
  return await indexer_graph(getChainTokensQuery(chain, limit, offset), variables, headers)
}

export const getSentTransactionsForAddress = async (
  address: string,
  limit?: string,
  offset?: string,
  variables = {},
  headers = {},
) => {
  return await indexer_graph(getSentTransactionsForAddressQuery(address, limit, offset), variables, headers)
}

export const getReceivedTransactionsForAddress = async (
  address: string,
  limit?: string,
  offset?: string,
  variables = {},
  headers = {},
) => {
  return await indexer_graph(getReceivedTransactionsForAddressQuery(address, limit, offset), variables, headers)
}

export const getContractCreationsForAddress = async (
  address: string,
  limit?: string,
  offset?: string,
  variables = {},
  headers = {},
) => {
  return await indexer_graph(getContractCreationsForAddressQuery(address, limit, offset), variables, headers)
}

export const getTokenTransfersForAddress = async (
  address: string,
  limit?: string,
  offset?: string,
  variables = {},
  headers = {},
) => {
  return await indexer_graph(getTokenTransfersForAddressQuery(address, limit, offset), variables, headers)
}

export const getTokenFromAddress = async (address: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTokenFromAddressQuery(address), variables, headers)
}

export const getBlock = async (number: number, variables = {}, headers = {}) => {
  return await indexer_graph(getBlockQuery(number), variables, headers)
}

export const getTransaction = async (hash: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTransactionQuery(hash), variables, headers)
}

export const getTransactionLogs = async (hash: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTransactionLogsQuery(hash), variables, headers)
}
