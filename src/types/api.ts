import { IndexerBlock, IndexerToken, IndexerTxLog, IndexerTxReceipt } from './indexer'

export interface ApiChainInfo {
  chain: string
  indexed_block: number
  last_block: number
}

export type ApiToken = IndexerToken & { coingecko_id?: string; cmc_id?: string }

export interface ApiChainTokens {
  chain: string
  count: number
}

export interface ApiAddressInfo {
  txs: number
}

export type ApiBlockInfo = IndexerBlock & { txs_hash?: string[] }

export type ApiTxInfo = IndexerTxReceipt & { log?: IndexerTxLog }
