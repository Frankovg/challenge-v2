import React, { type ReactNode } from 'react'
import type { Metadata } from 'next'
import { ApolloWrapper } from './ApolloWrapper'
import { Layout } from 'components/Layout'
import 'assets/globals/styles.css'

const IS_DEV = process.env.NODE_ENV !== 'production'

export const metadata: Metadata = {
  title: `UI challenge ${IS_DEV ? ' (dev)' : ' (prod)'}`,
  description: 'UI challenge application',
}

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ApolloWrapper>
          <Layout>{children}</Layout>
        </ApolloWrapper>
      </body>
    </html>
  )
}
