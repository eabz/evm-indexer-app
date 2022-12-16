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
  {
    id: 'gnosis',
    chainId: 100,
    name: 'Gnosis',
    logoUrl: 'gnosis-chain-logo.svg',
    rpcUrl: 'https://rpc.ankr.com/gnosis',
  },
  {
    id: 'bsc',
    chainId: 56,
    name: 'BNB Chain',
    logoUrl: 'bnbchain-logo.svg',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
  {
    id: 'avalanche',
    chainId: 43114,
    name: 'Avalanche',
    logoUrl: 'avalanche-logo.svg',
    rpcUrl: 'https://rpc.ankr.com/avalanche',
  },
  {
    id: 'arbitrum',
    chainId: 42161,
    name: 'Arbitrum',
    logoUrl: 'arbitrum-logo.svg',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  {
    id: 'dogechain',
    chainId: 2000,
    name: 'Doge Chain',
    logoUrl: 'dogechain-logo.png',
    rpcUrl: 'https://dogechain.ankr.com',
  },
]

export const chainById: { [key: string]: IChainInfo } = {}

for (const chain of chains) {
  chainById[chain.id] = chain
}
