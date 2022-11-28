export interface IChainInfo {
  id: string
  chainId: number
  name: string
  logoUrl: string
  rpcUrl: string
}

export const chains: IChainInfo[] = [
  {
    id: 'mainnet',
    chainId: 1,
    name: 'Ethereum',
    logoUrl: 'ethereum-logo.svg',
    rpcUrl: 'https://rpc.ankr.com/eth',
  },

  {
    id: 'fantom',
    chainId: 250,
    name: 'Fantom',
    logoUrl: 'fantom-logo.svg',
    rpcUrl: 'https://rpc.ankr.com/fantom',
  },
  {
    id: 'polygon',
    chainId: 137,
    name: 'Polygon',
    logoUrl: 'polygon-logo.svg',
    rpcUrl: 'https://polygon-rpc.com/',
  },
  {
    id: 'optimism',
    chainId: 10,
    name: 'Optimism',
    logoUrl: 'optimism-logo.svg',
    rpcUrl: 'https://mainnet.optimism.io/',
  },
]

export const chainById: { [key: string]: IChainInfo } = {}

for (const chain of chains) {
  chainById[chain.id] = chain
}
