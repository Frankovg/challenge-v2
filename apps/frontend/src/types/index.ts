import { type ApolloError } from '@apollo/client'
import { Dispatch, SetStateAction } from "react"

import { TabItem } from "components/ui/Tabs"

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

export type LineItemsContextType = {
  lineItems: LineItemType[]
  setLineItems: Dispatch<SetStateAction<LineItemType[]>>
  packages: TabItem[],
  setPackages: Dispatch<SetStateAction<TabItem[]>>
}
