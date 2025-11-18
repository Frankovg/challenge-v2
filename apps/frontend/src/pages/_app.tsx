import React, { type FC } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'

import { APOLLO_CLIENT } from 'lib/apolloClient'
import { Layout } from 'components/Layout'
import 'assets/globals/styles.css'

const IS_DEV = process.env.NODE_ENV !== 'production'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{`UI challenge ${IS_DEV ? ' (dev)' : ' (prod)'}`}</title>
      </Head>
      <ApolloProvider client={APOLLO_CLIENT}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  )
}

export default App
