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

export const getTokensCountForChainQuery = (chain: string): string => gql`
  query getTokensCountForChain {
    tokens_aggregate(where: { chain: { _eq: ${chain}} }) {
      aggregate {
        count
      }
    }
  }
`
