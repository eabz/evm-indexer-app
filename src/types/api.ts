import { IndexerToken } from './indexer'

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

export interface ApiBlockInfo {
  chain: string
}

export interface ApiTxInfo {
  chain: string
}
