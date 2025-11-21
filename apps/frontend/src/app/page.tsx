import { ReactNode, Suspense } from 'react'

import { Packing } from 'components/Packing'
import { LINE_ITEMS_QUERY } from 'hooks/useLineItemsQuery'
import { APOLLO_CLIENT } from 'lib/apolloClient'
import { LineItemsQueryType } from 'types'

import Loading from './loading'

export default async function HomePage(): Promise<ReactNode> {
  const { data } = await APOLLO_CLIENT.query<LineItemsQueryType>({
    query: LINE_ITEMS_QUERY,
    fetchPolicy: 'network-only',
  })

  const lineItems = data?.line_items || []

  return (
    <Suspense fallback={<Loading />}>
      <Packing initialLineItems={lineItems} />
    </Suspense>
  )
}
