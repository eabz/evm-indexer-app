export interface IChainInfo {
  id: string
  chainId: number
  name: string
  logoUrl: string
}

export const chains: IChainInfo[] = [
  {
    id: 'mainnet',
    chainId: 1,
    name: 'Ethereum',
    logoUrl: 'ethereum-logo.svg',
  },

  {
    id: 'fantom',
    chainId: 250,
    name: 'Fantom',
    logoUrl: 'fantom-logo.svg',
  },
  {
    id: 'polygon',
    chainId: 137,
    name: 'Polygon',
    logoUrl: 'polygon-logo.svg',
  },
  {
    id: 'optimism',
    chainId: 10,
    name: 'Optimism',
    logoUrl: 'optimism-logo.svg',
  },
]

export const chainById: { [key: string]: IChainInfo } = {}

for (const chain of chains) {
  chainById[chain.id] = chain
}
