import { ApolloClient, InMemoryCache } from '@apollo/client'

// SCALE / correctness notes for a production-grade setup:
// 1. This is a module singleton shared by both the RSC fetch (page.tsx) and the
//    client (ApolloWrapper). On the server a shared client leaks cache across
//    requests of different users. At scale, use a per-request client in RSC via
//    `@apollo/client-integration-nextjs` (registerApolloClient) + its provider.
// 2. `addTypename: false` disables normalized caching, and queries run with
//    `network-only`, so the cache is effectively unused. Paginated lists need a
//    normalized cache (typename on) plus `offsetLimitPagination`/`relayStyle`
//    field policies for `fetchMore` to merge pages.
export const APOLLO_CLIENT = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache({
    addTypename: false,
  }).restore({}),
})
