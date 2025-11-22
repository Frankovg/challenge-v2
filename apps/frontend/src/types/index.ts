import { type ApolloError } from '@apollo/client'

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

export interface PackedItem extends Omit<TabItem, 'value'> {
  value: number
  data: {
    id: number,
    line_items: LineItemType[]
  }
}

export type LineItemsContextType = {
  lineItems: LineItemType[]
  packages: PackedItem[]
  selectedPackageIndex: number
  setSelectedPackageIndex: (index: number) => void
  selectedPackageData: PackedItem['data']
  allItemsPacked: boolean
  totalPackedItems: number
  canShip: boolean
  packItem: (item: LineItemType, packageId: number, quantity: number) => void
  unpackItem: (itemId: number, packageId: number, quantity: number) => void
  addPackage: () => void
  removePackage: (packageId: number) => void
  updateItemQuantity: (packageId: number, itemId: number, newQuantity: number) => void
}

export type AddToPackageButton = 'one' | 'all'
