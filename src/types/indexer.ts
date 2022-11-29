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

export interface IndexerBlock {
  base_fee_per_gas: string
  chain: string
  difficulty: string
  gas_limit: string
  gas_used: string
  hash: string
  miner: string
  nonce: string
  number: number
  size: string
  timestamp: string
  total_difficulty: string
  txs: number
}

export interface IndexerTxHashChain {
  chain: string
  hash: string
}

export interface IndexerTxReceipt {
  success: boolean
  chain: string
  hash: string
  tx: IndexerTx
}

export interface IndexerTx {
  block_number: number
  from_address: string
  gas_price: string
  gas_used: string
  input: string
  max_fee_per_gas: string
  max_priority_fee_per_gas: string
  to_address: string
  transaction_index: number
  transaction_type: number
  value: string
  block: {
    timestamp: string
  }
}

export interface IndexerTxLog {
  address: string
  chain: string
  data: string
  hash: string
  log_index: number
  log_type: string
  topics: string[]
  transaction_log_index: number
  tx: { block: { timestamp: string } }
}
