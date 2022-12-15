import { gql } from 'graphql-request'

export const getChainBlocksQuery = (): string => gql`
  query getChainBlocks {
    state(order_by: { chain: asc }) {
      blocks
      chain
    }
  }
`
