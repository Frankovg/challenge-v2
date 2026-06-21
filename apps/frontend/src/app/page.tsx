import { gql } from '@apollo/client'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { Packing } from 'components/Packing/Packing'
import { LineItemsProvider } from 'contexts/AppContext'
import { APOLLO_CLIENT } from 'lib/apolloClient'
import { LineItemsQueryType } from 'types'

// SCALE: this query fetches the entire inventory in one shot. With thousands of
// products this becomes the main bottleneck (payload size, parse, memory, and
// rendering every row). To scale, add pagination args to the schema
// (`line_items(limit: Int, offset: Int)` or cursor-based `first/after`) and
// load incrementally with Apollo's `fetchMore` + an `offsetLimitPagination`
// field policy, paired with list virtualization on the UI.
const LINE_ITEMS_QUERY = gql`
  query line_items {
    line_items {
      id
      quantity
      sku
      location
    }
  }
`

export default async function HomePage(): Promise<ReactNode> {
  // Initial inventory is fetched server-side (RSC) and handed to the provider
  // as the single source. SCALE: this loads the whole inventory at once — for
  // thousands of products, paginate via `searchParams` (limit/offset) here and
  // stream pages. Reads stay in RSC/Apollo; Server Actions are for mutations.
  const { data, error } = await APOLLO_CLIENT.query<LineItemsQueryType>({
    query: LINE_ITEMS_QUERY,
    fetchPolicy: 'network-only',
  })

  if (error) {
    console.error('Failed to fetch line items:', error)
    throw new Error('Failed to load inventory data')
  }

  const lineItems = data?.line_items || []

  if (lineItems.length === 0) {
    return notFound()
  }

  return (
    <LineItemsProvider initialLineItems={lineItems}>
      <Packing />
    </LineItemsProvider>
  )
}
