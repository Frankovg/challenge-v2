import { type ApolloError } from '@apollo/client'

import { TabItem } from "components/ui/Tabs"

export type LineItemType = {
  id: number
  quantity: number
  sku: string
  location: string
}

export type PackedPackage = {
  id: number
  line_items: LineItemType[]
}

export type PackedPackages = {
  packages: PackedPackage[]
}

export type PackItemsMutationResponse = {
  pack_items: PackedPackages
}

export type UsePackItemsMutationType = {
  packItems: (packages: PackedPackage[]) => Promise<PackedPackages>
  data: PackItemsMutationResponse | undefined | null
  loading: boolean
  error: ApolloError | undefined
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
  // totalPackedItems: number
  packProduct: (item: LineItemType, packageId: number, quantity: number) => void
  addPackage: () => void
  removePackage: (packageId: number, force?: boolean) => void
  updateItemQuantity: (packageId: number, itemId: number, newQuantity: number) => void
  shipPackages: (items: PackedPackage[]) => Promise<void>
}

export type AddToPackageButton = 'one' | 'all'
