'use server'

import { APOLLO_CLIENT } from 'lib/apolloClient'
import { LINE_ITEMS_QUERY } from 'lib/queries'
import { validateBarcode } from 'lib/validations'
import { getProductsByCode } from 'utils/lineItemOperations'

import type { LineItemsQueryType, LineItemType } from 'types'

// A product can live in several locations, so ideally the backend does the
// filtering and applies the business logic to decide which location to pick from.

// I put this in a Server Action thinking about a search across thousands of
// products. In that case the client only shows a few at a time, so the lookup has
// to happen on the server, not in the browser.

export async function findProductsBySku(
  sku: string,
): Promise<LineItemType[]> {
  if (validateBarcode(sku)) return []

  const { data } = await APOLLO_CLIENT.query<LineItemsQueryType>({
    query: LINE_ITEMS_QUERY,
    fetchPolicy: 'network-only',
  })

  return getProductsByCode(data?.line_items ?? [], sku)
}
