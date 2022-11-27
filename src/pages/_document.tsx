import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="EVM Indexer App" name="application-name" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
