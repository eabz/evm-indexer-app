export interface Tx {
  success: boolean
  chain: string
  hash: string
  tx: {
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
  log?: {
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
}
