import { ApolloClient, InMemoryCache } from '@apollo/client'

export const APOLLO_CLIENT = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache({
    addTypename: false,
  }).restore({}),
})
