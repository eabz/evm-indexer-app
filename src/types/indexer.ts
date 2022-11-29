export interface IndexerChainInfo {
  chain: string
  blocks: number
}

export interface IndexerToken {
  address: string
  chain: string
  decimals: number
  name: string
  symbol: string
}
