import { type ApolloError } from '@apollo/client'

export type LineItemType = {
  id: number
  quantity: number
  sku: string
  location: string
}

export type LineItemsQueryType = {
  line_items: LineItemType[]
}

export type UseLineItemsQueryType = {
  lineItems: LineItemType[]
  error: ApolloError | undefined
  loading: boolean
}
