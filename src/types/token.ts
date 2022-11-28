export interface IndexerToken {
  address: string
  chain: string
  decimals: number
  name: string
  symbol: string
}

export interface CoingeckoToken {
  id: string
  symbol: string
  name: string
}

export interface CmcToken {
  id: string
  rank: string
  name: string
  symbol: string
  slug: string
}
