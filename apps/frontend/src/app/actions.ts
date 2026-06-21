'use server'

import { APOLLO_CLIENT } from 'lib/apolloClient'
import { LINE_ITEMS_QUERY } from 'lib/queries'
import { validateBarcode } from 'lib/validations'
import { getProductsByCode } from 'utils/lineItemOperations'

import type { LineItemsQueryType, LineItemType } from 'types'

/**
 * Server Action: resolves a SKU to its inventory records on the server (RPC).
 * Returns a list because a SKU can span several locations (see
 * `getProductsByCode`).
 *
 * WHY a Server Action and not a normal client fetch (Apollo `useLazyQuery`):
 * - At scale the client doesn't hold the full inventory (the list is
 *   paginated), so a SKU scan can't be resolved from in-memory data — it has
 *   to be looked up server-side. A client query against this mock would still
 *   pull the entire inventory down and filter it in the browser (no gain over
 *   the old in-memory `find`). The Server Action runs the lookup on the server
 *   and ships back only the matching rows.
 * - It keeps data access on the server (the day this points at an indexed
 *   `line_items(sku: $sku)` query, the client doesn't change) and gives a
 *   type-safe RPC without hand-writing a Route Handler.
 * - Caveat: this is a read, and Server Actions are primarily meant for
 *   mutations (they're dispatched serially). For a single on-demand point
 *   lookup it's an accepted, pragmatic use; a Route Handler / RSC query would
 *   be equally valid. The paginated *list* still belongs in RSC, not here.
 *
 * SCALE: the mock only exposes `line_items` (all of them), so we fetch and
 * filter here; ideally the backend exposes the indexed per-SKU query above.
 */
export async function findProductsBySku(
  sku: string,
): Promise<LineItemType[]> {
  // Defense-in-depth: a Server Action is a public HTTP endpoint, so re-validate
  // server-side even though the client validates for UX. (If this ever hits a
  // real DB, the untrusted `sku` shouldn't reach the data layer unchecked.)
  if (validateBarcode(sku)) return []

  const { data } = await APOLLO_CLIENT.query<LineItemsQueryType>({
    query: LINE_ITEMS_QUERY,
    fetchPolicy: 'network-only',
  })

  return getProductsByCode(data?.line_items ?? [], sku)
}
