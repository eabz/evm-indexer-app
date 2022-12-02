export interface TransactionHistory {
  block_number: number
  chain: string
  timestamp: string
  from_address: string
  gas_price: string
  gas_used: string
  hash: string
  input: string
  max_fee_per_gas: string
  max_priority_fee_per_gas: string
  to_address: string
  transaction_index: number
  transaction_type: number
  value: string
  token_tranfers: {
    from_address: string
    to_address: string
    log_index: number
    token: string
    value: string
  }[]
  success: boolean
  contract_interacted?: string
}
