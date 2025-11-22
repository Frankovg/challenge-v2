'use client'

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { reduceLineItemQuantity, updatePackagesWithItem } from 'utils/packageOperations'

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
    setPackages(prev => {
      //TODO: id and value should be the same
      const ids = prev.map(p => p.data.id)
      const values = prev.map(p => p.value)
      const newId = ids.length > 0 ? Math.max(...ids) + 1 : 0
      const newValue = values.length > 0 ? Math.max(...values) + 1 : 0

      return [
        ...prev,
        {
          value: newValue,
          label: `Package ${newValue + 1}`, //TODO: is it okay?
          data: {
            id: newId,
            line_items: []
          }
        }
      ]
    })
  }, [])

  const removePackage = useCallback((packageId: number): void => {
    setPackages(prev => {
      const packageToRemove = prev.find(pkg => pkg.data.id === packageId)
      if (!packageToRemove) return prev

      if (packageToRemove.data.line_items.length > 0) {
        setLineItems(prevItems => {
          const itemsToReturn = packageToRemove.data.line_items
          const updatedItems = [...prevItems]

          itemsToReturn.forEach(item => {
            const existingItemIndex = updatedItems.findIndex(li => li.id === item.id)
            if (existingItemIndex >= 0) {
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + item.quantity
              }
            } else {
              updatedItems.push(item)
            }
          })

          return updatedItems
        })
      }

      return prev.filter(pkg => pkg.data.id !== packageId)
    })
  }, [])

  const updateItemQuantity = useCallback((packageId: number, itemId: number, newQuantity: number): void => {
    if (newQuantity < 0) return

    setPackages(prev => prev.map(pkg => {
      if (pkg.data.id !== packageId) return pkg

      const item = pkg.data.line_items.find(li => li.id === itemId)
      if (!item) return pkg

      const quantityDiff = item.quantity - newQuantity

      if (newQuantity === 0) {
        setLineItems(prevItems => {
          const existingItem = prevItems.find(li => li.id === itemId)
          if (existingItem) {
            return prevItems.map(li =>
              li.id === itemId
                ? { ...li, quantity: li.quantity + item.quantity }
                : li
            )
          }
          return [...prevItems, item]
        })

        return {
          ...pkg,
          data: {
            ...pkg.data,
            line_items: pkg.data.line_items.filter(li => li.id !== itemId)
          }
        }
      }

      if (quantityDiff > 0) {
        setLineItems(prevItems => {
          const existingItem = prevItems.find(li => li.id === itemId)
          if (existingItem) {
            return prevItems.map(li =>
              li.id === itemId
                ? { ...li, quantity: li.quantity + quantityDiff }
                : li
            )
          }
          return [...prevItems, { ...item, quantity: quantityDiff }]
        })
      }

      return {
        ...pkg,
        data: {
          ...pkg.data,
          line_items: pkg.data.line_items.map(li =>
            li.id === itemId
              ? { ...li, quantity: newQuantity }
              : li
          )
        }
      }
    }))
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
