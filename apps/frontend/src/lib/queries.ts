import { gql } from '@apollo/client'

// SCALE: this query fetches the entire inventory in one shot. With thousands of
// products this becomes the main bottleneck (payload size, parse, memory, and
// rendering every row). To scale, add pagination args to the schema
// (`line_items(limit: Int, offset: Int)` or cursor-based `first/after`) and
// load incrementally with Apollo's `fetchMore` + an `offsetLimitPagination`
// field policy, paired with list virtualization on the UI.
export const LINE_ITEMS_QUERY = gql`
  query line_items {
    line_items {
      id
      quantity
      sku
      location
    }
  }
`
