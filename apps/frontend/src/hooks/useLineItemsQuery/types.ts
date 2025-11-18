import { type ApolloError } from '@apollo/client'

type LineItemsType = {
  id: number
  quantity: number
  sku: string
  location: string
}

export type LineItemsQueryType = {
  line_items: LineItemsType[]
}

export type UseLineItemsQueryType = {
  lineItems: LineItemsType[]
  error: ApolloError | undefined
  loading: boolean
}
