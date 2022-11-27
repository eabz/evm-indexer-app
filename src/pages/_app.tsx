import { ChakraProvider } from '@chakra-ui/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        canonical={'https://evm-indexer.kindynos.mx'}
        description={'EVM Chains Indexer'}
        title={'EVM Chains Indexer'}
      />
      <ChakraProvider resetCSS>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}
