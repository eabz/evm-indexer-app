import { gql } from 'graphql-request'

export const getChainBlocksQuery = (chain: string): string => gql`
  query getChainBlocks {
    blocks_aggregate(where: { chain: { _eq: ${chain} } }) {
      aggregate {
        count
      }
    }
  }
`

export const getChainsQuery = (): string => gql`
  query getChains {
    state {
      chain
    }
  }
`
