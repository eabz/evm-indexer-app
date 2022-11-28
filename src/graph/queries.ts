import { gql } from 'graphql-request'

export const getChainBlocksQuery = (): string => gql`
  query getChainBlocks {
    state {
      blocks
      chain
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

export const getChainTokensQuery = (chain: string): string => gql`
  query getChainTokens {
    tokens(where: { chain: { _eq: ${chain} } }) {
      address
      chain
      decimals
      name
      symbol
    }
  }
`
