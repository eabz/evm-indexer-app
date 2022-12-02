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
    tokens_aggregate(where: { chain: { _eq: "${chain}"} }) {
      aggregate {
        count
      }
    }
  }
`

export const getChainTokensQuery = (chain: string, limit: number, offset: number): string => gql`
  query getChainTokens {
    tokens(where: { chain: { _eq: "${chain}" } }, limit: ${limit}, offset: ${offset}, order_by: {name: asc}) {
      address
      chain
      decimals
      name
      symbol
    }
  }
`

export const getTokenFromAddressAndChainQuery = (address: string, chain: string): string => gql`
  query getTokenFromAddressAndChain {
    tokens(where: { address: { _eq: "${address}" }, chain: { _eq: "${chain}" } }) {
      address
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
      txs_hash {
        hash 
      }
    }
  }
`

export const getTransactionQuery = (hash: string): string => gql`
  query getTransaction {
    txs(where: { hash: { _eq: "${hash}" } }) {
      block_number
      chain
      timestamp
      from_address
      gas_price
      gas_used
      hash
      input
      max_fee_per_gas
      max_priority_fee_per_gas
      to_address
      transaction_index
      transaction_type
      value
      token_transfers_aggregate(order_by: {log_index: asc}) {
        nodes {
          from_address
          to_address
          log_index
          token
          value
        }
      }
      receipt {
        success
      }
      logs_aggregate(order_by: {log_index: asc}) {
        nodes {
          address
          data
          log_index
          log_type
          topics
          transaction_log_index
        }
      }
      contract_interaction {
        contract
      }
    }
  }
`

export const getTransactionHistoryQuery = (address: string, limit: number, offset: number): string => gql`
  query getTransactionHistory {
    txs(
      where: {
        _or: [
          { from_address: { _eq: "${address}" } }
          { to_address: { _eq: "${address}" } }
        ]
      }
      limit: ${limit}
      offset: ${offset}
      order_by: { timestamp: desc }
    ) {
      block_number
      chain
      timestamp
      from_address
      gas_price
      gas_used
      hash
      max_fee_per_gas
      max_priority_fee_per_gas
      to_address
      transaction_index
      transaction_type
      value
      token_transfers_aggregate(order_by: { log_index: asc }) {
        nodes {
          from_address
          to_address
          log_index
          token
          value
        }
      }
      receipt {
        success
      }
      contract_interaction {
        contract
      }
    }
  }
`

export const getAddressTokensQuery = (address: string): string => gql`
query getAddressTokensQuery {
  token_transfers(where: {_or: [{from_address: {_eq: "${address}"}}, {to_address: {_eq: "${address}"}}]}, distinct_on: token) {
     token
      token_details {
        chain
        decimals
        name
        symbol
      }
  }
}
`

export const getAddressContractInteractionsQuery = (address: string): string => gql`
  query getAddressContractInteractions {
    contract_interactions(where: {address: {_eq: "${address}"}}, distinct_on: contract) {
      contract
    }
  }
`
