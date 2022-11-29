import { ChakraProvider } from '@chakra-ui/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'

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
      <NextNProgress
        height={3}
        options={{ showSpinner: false }}
        showOnShallow={false}
        startPosition={0.1}
        stopDelayMs={200}
      />
      <ChakraProvider theme={theme} resetCSS>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}
