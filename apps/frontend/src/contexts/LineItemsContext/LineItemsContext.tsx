'use client'

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { createPackage } from 'utils/addPackageOperations'
import { rebuildPackageTabs, restoreItems, selectPackage } from 'utils/packageOperations'
import { reduceLineItemQuantity, updatePackagesWithItem } from 'utils/packingOperations'
import {
  adjustLineItemsAfterUpdate,
  updatePackageItemQuantity,
} from 'utils/updateQuantityOperations'

import { INITIAL_PACKAGE } from './const'

import type { LineItemsContextType, PackedItem, LineItemType } from 'types'

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

  const selectedPackageData = packages[selectedPackageIndex]?.data

  //TODO: DUDOSOS
  const allItemsPacked = useMemo(() => lineItems.length === 0, [lineItems])
  const totalPackedItems = useMemo(() => {
    return packages.reduce((total, pkg) => {
      return total + pkg.data.line_items.reduce((sum, item) => sum + item.quantity, 0)
    }, 0)
  }, [packages])
  const canShip = useMemo(() => {
    return allItemsPacked && packages.length > 0 && totalPackedItems > 0
  }, [allItemsPacked, packages.length, totalPackedItems])


  const packItem = useCallback((item: LineItemType, packageId: number, quantity: number): void => {
    if (quantity <= 0 || quantity > item.quantity) return

    setPackages(prev => updatePackagesWithItem(prev, item, packageId, quantity))
    setLineItems(prev => reduceLineItemQuantity(prev, item.id, quantity))
  }, [])


  const unpackItem = useCallback((itemId: number, packageId: number, quantity: number): void => {
    if (quantity <= 0) return

    let unpackedItem: LineItemType | null = null

    setPackages(prev => prev.map(pkg => {
      if (pkg.data.id !== packageId) return pkg

      const item = pkg.data.line_items.find(li => li.id === itemId)
      if (!item) return pkg

      unpackedItem = { ...item, quantity }

      const remainingQuantity = item.quantity - quantity

      if (remainingQuantity === 0) {
        return {
          ...pkg,
          data: {
            ...pkg.data,
            line_items: pkg.data.line_items.filter(li => li.id !== itemId)
          }
        }
      } else {
        return {
          ...pkg,
          data: {
            ...pkg.data,
            line_items: pkg.data.line_items.map(li =>
              li.id === itemId
                ? { ...li, quantity: remainingQuantity }
                : li
            )
          }
        }
      }
    }))

    if (unpackedItem) {
      setLineItems(prev => {
        const existingItem = prev.find(li => li.id === itemId)
        if (existingItem) {
          return prev.map(li =>
            li.id === itemId
              ? { ...li, quantity: li.quantity + quantity }
              : li
          )
        }
        return [...prev, unpackedItem!]
      })
    }
  }, [])


  const addPackage = useCallback((): void => {
    setPackages(prev => createPackage(prev))
  }, [])


  const removePackage = useCallback((packageId: number): void => {
    const packageToRemove = packages.find(pkg => pkg.data.id === packageId)
    if (!packageToRemove) return

    const removedPackageIndex = packages.findIndex(pkg => pkg.data.id === packageId)
    const itemsToReturn = [...packageToRemove.data.line_items]

    setPackages(prev => rebuildPackageTabs(prev, packageId))

    if (removedPackageIndex !== -1) {
      setSelectedPackageIndex(prevIndex =>
        selectPackage(removedPackageIndex, prevIndex, packages.length)
      )
    }

    if (itemsToReturn.length > 0) {
      setLineItems(prevItems => restoreItems(prevItems, itemsToReturn))
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

  return (
    <LineItemsContext.Provider
      value={{
        lineItems,
        packages,
        selectedPackageIndex,
        setSelectedPackageIndex,
        selectedPackageData,
        allItemsPacked,
        totalPackedItems,
        canShip,
        packItem,
        unpackItem,
        addPackage,
        removePackage,
        updateItemQuantity,
      }}
    >
      {children}
    </LineItemsContext.Provider>
  )
}
