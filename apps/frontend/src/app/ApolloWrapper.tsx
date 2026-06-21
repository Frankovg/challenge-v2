'use client'

import { ApolloProvider } from '@apollo/client'
import React, { type ReactNode } from 'react'

import { APOLLO_CLIENT } from 'lib/apolloClient'

export function ApolloWrapper({
  children,
}: {
  children: ReactNode
}): ReactNode {
  return <ApolloProvider client={APOLLO_CLIENT}>{children}</ApolloProvider>
}
