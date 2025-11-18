import { useQuery, gql } from '@apollo/client'
import { LineItemsQueryType, UseLineItemsQueryType } from './types'

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

export const useLineItemsQuery = (): UseLineItemsQueryType => {
  const { data, error, loading } = useQuery<LineItemsQueryType>(
    LINE_ITEMS_QUERY,
    { fetchPolicy: 'network-only' },
  )

  return {
    lineItems: data?.line_items || [],
    loading: loading,
    error: error,
  }
}
