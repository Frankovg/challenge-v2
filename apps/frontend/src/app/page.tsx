import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { Packing } from 'components/Packing'
import { LineItemsProvider } from 'contexts/AppContext'
import { LINE_ITEMS_QUERY } from 'hooks/useLineItemsQuery'
import { APOLLO_CLIENT } from 'lib/apolloClient'
import { LineItemsQueryType } from 'types'

export default async function HomePage(): Promise<ReactNode> {
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
