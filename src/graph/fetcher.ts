import request from 'graphql-request'

import { IndexerBlock, IndexerChainInfo, IndexerTxHashChain, IndexerTxLog, IndexerTxReceipt } from '@/types'

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
  getTransactionLogsQuery,
  getTransactionQuery,
  getTransactionsForBlockQuery,
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

export const getTokenFromAddress = async (address: string, variables = {}, headers = {}) => {
  return await indexer_graph(getTokenFromAddressQuery(address), variables, headers)
}

export const getBlocks = async (number: number, variables = {}, headers = {}): Promise<{ blocks: IndexerBlock[] }> => {
  return await indexer_graph(getBlockQuery(number), variables, headers)
}

export const getTransactionForBlock = async (
  number: number,
  variables = {},
  headers = {},
): Promise<{ txs: IndexerTxHashChain[] }> => {
  return await indexer_graph(getTransactionsForBlockQuery(number), variables, headers)
}

export const getTransaction = async (
  hash: string,
  variables = {},
  headers = {},
): Promise<{ txs_receipts: IndexerTxReceipt[] }> => {
  return await indexer_graph(getTransactionQuery(hash), variables, headers)
}

export const getTransactionLogs = async (
  hash: string,
  variables = {},
  headers = {},
): Promise<{ logs: IndexerTxLog[] }> => {
  return await indexer_graph(getTransactionLogsQuery(hash), variables, headers)
}
