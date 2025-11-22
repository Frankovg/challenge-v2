'use client'

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { usePackItemsMutation } from 'hooks/usePackItemsMutation'
import { createPackage } from 'utils/addPackageOperations'
import { rebuildPackageTabs, restoreItems, selectPackage } from 'utils/packageOperations'
import { reduceLineItemQuantity, updatePackagesWithItem } from 'utils/packingOperations'
import {
  adjustLineItemsAfterUpdate,
  updatePackageItemQuantity,
} from 'utils/updateQuantityOperations'

import { INITIAL_PACKAGE } from './const'

import type { LineItemsContextType, PackedItem, LineItemType, PackedPackage } from 'types'

export const LineItemsContext = createContext<LineItemsContextType | undefined>(undefined)

type LineItemsProviderProps = {
  children: ReactNode
  initialLineItems: LineItemType[]
}

export const LineItemsProvider = ({
  children,
  initialLineItems,
}: LineItemsProviderProps): ReactNode => {
  const [packages, setPackages] = useState<PackedItem[]>(INITIAL_PACKAGE)
  const [lineItems, setLineItems] = useState<LineItemType[]>(initialLineItems)
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0)

  const { packItems, error } = usePackItemsMutation()

  const selectedPackageData = packages[selectedPackageIndex]?.data

  const allItemsPacked = useMemo(() => lineItems.length === 0, [lineItems])
  // const totalPackedItems = useMemo(() => {
  //   return packages.reduce((total, pkg) => {
  //     return total + pkg.data.line_items.reduce((sum, item) => sum + item.quantity, 0)
  //   }, 0)
  // }, [packages])


  const packItem = useCallback((item: LineItemType, packageId: number, quantity: number): void => {
    if (quantity <= 0 || quantity > item.quantity) return

    setPackages(prev => updatePackagesWithItem(prev, item, packageId, quantity))
    setLineItems(prev => reduceLineItemQuantity(prev, item.id, quantity))
  }, [])


  const addPackage = useCallback((): void => {
    setPackages(prev => createPackage(prev))
  }, [])


  const removePackage = useCallback((packageId: number, force = false): void => {
    const packageToRemove = packages.find(pkg => pkg.data.id === packageId)
    if (!packageToRemove) return

    const itemsToReturn = [...packageToRemove.data.line_items]
    const hasItems = itemsToReturn.length > 0
    const isSinglePackage = packages.length === 1

    if (isSinglePackage && !hasItems || hasItems && !force) return

    if (isSinglePackage) {
      setPackages(INITIAL_PACKAGE)
      setSelectedPackageIndex(0)
      if (hasItems) {
        setLineItems(prevItems => restoreItems(prevItems, itemsToReturn))
      }
    } else {
      const removedPackageIndex = packages.findIndex(pkg => pkg.data.id === packageId)

      setPackages(prev => rebuildPackageTabs(prev, packageId))
      setSelectedPackageIndex(prevIndex =>
        selectPackage(removedPackageIndex, prevIndex, packages.length)
      )

      if (hasItems) setLineItems(prevItems => restoreItems(prevItems, itemsToReturn))
    }
  }, [packages])


  const updateItemQuantity = useCallback((packageId: number, itemId: number, newQuantity: number): void => {
    if (newQuantity < 0) return

    let itemToUpdate: LineItemType | null = null
    let quantityDiff = 0

    setPackages(prev => {
      const pkg = prev.find(p => p.data.id === packageId)
      if (!pkg) return prev

      const item = pkg.data.line_items.find(li => li.id === itemId)
      if (!item) return prev

      itemToUpdate = item
      quantityDiff = item.quantity - newQuantity

      return updatePackageItemQuantity(prev, packageId, itemId, newQuantity)
    })

    setLineItems(prevItems =>
      adjustLineItemsAfterUpdate(
        prevItems,
        itemToUpdate!,
        itemId,
        newQuantity,
        quantityDiff,
        reduceLineItemQuantity
      )
    )
  }, [])


  const shipPackages = useCallback(async (items: PackedPackage[]) => {
    try {
      const result = await packItems(items)
      console.log("result ", result);

      setPackages(INITIAL_PACKAGE)
    } catch {
      console.error(error)
    }
    console.log("Packed: ", packItems)
  }, [])



  return (
    <LineItemsContext.Provider
      value={{
        lineItems,
        packages,
        selectedPackageIndex,
        setSelectedPackageIndex,
        selectedPackageData,
        allItemsPacked,
        // totalPackedItems,
        packItem,
        addPackage,
        removePackage,
        updateItemQuantity,
        shipPackages
      }}
    >
      {children}
    </LineItemsContext.Provider>
  )
}
