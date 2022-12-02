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

export interface IndexerTokenTransfer {
  token: string
  token_details: IndexerToken
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
  txs_hash: [{ hash: string }]
}

export interface IndexerTransaction {
  block_number: number
  chain: string
  block: {
    timestamp: string
  }
  from_address: string
  gas_price: string
  gas_used: string
  hash: string
  timestamp: string
  input: string
  max_fee_per_gas: string
  max_priority_fee_per_gas: string
  to_address: string
  transaction_index: number
  transaction_type: number
  value: string
  token_transfers_aggregate: {
    nodes: {
      from_address: string
      to_address: string
      log_index: number
      token: string
      value: string
    }[]
  }
  receipt: {
    success: boolean
  }
  logs_aggregate: {
    nodes: {
      address: string
      data: string
      log_index: number
      log_type: string
      topics: string[]
      transaction_log_index: number
    }[]
  }
  contract_interaction: {
    contract: string
  }
  contract_creation: {
    contract: string
  }
}
