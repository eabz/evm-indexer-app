import { ChakraProvider } from '@chakra-ui/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import { theme } from '@/theme'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        canonical={'https://evm-indexer.kindynos.mx'}
        description={'EVM Chains Indexer'}
        title={'EVM Chains Indexer'}
      />
      <ChakraProvider theme={theme} resetCSS>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}
