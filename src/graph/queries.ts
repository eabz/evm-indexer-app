import { gql } from 'graphql-request'

export const getChainBlocksQuery = (): string => gql`
  query getChainBlocks {
    state(order_by: { chain: asc }) {
      blocks
      chain
    }
  }
`

export const getChainsQuery = (): string => gql`
  query getChains {
    state(order_by: { chain: asc }) {
      chain
    }
  }
`

export const getTokensCountForChainQuery = (chain: string): string => gql`
  query getTokensCountForChain {
    tokens_aggregate(where: { chain: { _eq: ${chain}} }) {
      aggregate {
        count
      }
    }
  }
`

export const getChainTokensQuery = (chain: string, limit = '500', offset = '0'): string => gql`
  query getChainTokens {
    tokens(where: { chain: { _eq: ${chain} } }, limit: ${limit}, offset: ${offset}, order_by: {name: asc}) {
      address
      chain
      decimals
      name
      symbol
    }
  }
`

export const getSentTransactionsForAddressQuery = (address: string, limit = '500', offset = '0'): string => gql`
  query getSentTransactionsForAddress {
    txs(where: {from_address: {_eq: "${address}"}}, limit: ${limit}, offset:  ${offset}, order_by: {block: {timestamp: asc}}) {
      max_fee_per_gas
      max_priority_fee_per_gas
      transaction_type
      block_number
      chain
      from_address
      gas_price
      gas_used
      hash
      to_address
      transaction_index
      value
      block {
        timestamp
      }
    }
  }
`

export const getReceivedTransactionsForAddressQuery = (address: string, limit = '500', offset = '0'): string => gql`
  query getReceivedTransactionsForAddress {
    txs(where: {to_address: {_eq: "${address}"}}, limit: ${limit}, offset:  ${offset}, order_by: {block: {timestamp: asc}}) {
      max_fee_per_gas
      max_priority_fee_per_gas
      transaction_type
      block_number
      chain
      from_address
      gas_price
      gas_used
      hash
      to_address
      transaction_index
      value
      block {
        timestamp
      }
    }
  }
`

export const getContractCreationsForAddressQuery = (address: string, limit = '500', offset = '0'): string => gql`
  query getContractCreationsForAddress {
    contract_creations(where: {tx: {from_address: {_eq: "${address}"}}}, limit: ${limit}, offset: ${offset}, order_by: {tx: {block: {timestamp: asc}}}) {
      chain
      contract
      block
      hash
      tx {
        gas_price
        gas_used
        max_fee_per_gas
        max_priority_fee_per_gas
        input
        block {
          timestamp
        }
      }
    }
  }
`

export const getContractInteractionsForAddressQuery = (address: string, limit = '500', offset = '0'): string => gql`
  query getContractInteractionsForAddress {
    contract_interactions(where: { tx: { from_address: { _eq: "${address}" } } }, limit: ${limit}, offset: ${offset}, order_by: {tx: {block: {timestamp: asc}}}) {
      block
      chain
      contract
      tx {
        gas_price
        gas_used
        max_fee_per_gas
        max_priority_fee_per_gas
        to_address
        transaction_index
        transaction_type
        value
        block {
          timestamp
        }
      }
      hash
    }
  }
`

export const getTokenTransfersForAddressQuery = (address: string, limit = '500', offset = '0'): string => gql`
  query getTokenTransfersForAddress {
    token_transfers(where: { tx: { from_address: { _eq: "${address}" } } }, limit: ${limit}, offset: ${offset}, order_by: {tx: {block: {timestamp: asc}}}) {
      block
      chain
      token
      value
      to_address
      tx {
        gas_price
        gas_used
        max_fee_per_gas
        max_priority_fee_per_gas
        value
        block {
          timestamp
        }
      }
    }
  }
`

export const getTokenFromAddressQuery = (address: string): string => gql`
  query getTokenFromAddress {
    tokens(where: { address: { _eq: "${address}" } }) {
      chain
      decimals
      name
      symbol
    }
  }
`

export const getBlockQuery = (number: number): string => gql`
  query getBlock {
    blocks(where: {number: {_eq: ${number}}}, order_by: {chain: asc}) {
      base_fee_per_gas
      chain
      difficulty
      gas_limit
      gas_used
      hash
      miner
      nonce
      number
      size
      timestamp
      total_difficulty
      txs
    }
  }
`

export const getTransactionQuery = (hash: string): string => gql`
  query getTransaction {
    txs_receipts(where: { tx: { hash: { _eq: "${hash}" } } }) {
      success
      chain
      hash
      tx {
        block_number
        from_address
        gas_price
        gas_used
        input
        max_fee_per_gas
        max_priority_fee_per_gas
        to_address
        transaction_index
        transaction_type
        value
        block {
          timestamp
        }
      }
    }
  }
`

export const getTransactionLogsQuery = (hash: string): string => gql`
  query getTransactionLogs {
    logs(where: { tx: { hash: { _eq: "${hash}" } } }) {
      address
      chain
      data
      hash
      log_index
      log_type
      topics
      transaction_log_index
      block {
        timestamp
      }
    }
  }
`
