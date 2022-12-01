export interface Block {
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
  txs_hash?: string[]
}
