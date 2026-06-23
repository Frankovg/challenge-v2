'use client'

import { createContext, useContext, useReducer, type ReactNode } from 'react'

import { useToast } from 'components/ui/toast/ToastProvider'
import { useShipping } from 'hooks/useShipping'

import { createInitialState, packingReducer } from './packingReducer'

import type { LineItemsContextType, LineItemType } from 'types'

const INVALID_QUANTITY = {
  title: 'Invalid quantity',
  description: 'Please enter a valid amount.',
  type: 'error',
} as const

export const AppContext = createContext<LineItemsContextType | undefined>(
  undefined,
)

type LineItemsProviderProps = {
  children: ReactNode
  initialLineItems: LineItemType[]
}


// React Context re-renders on every change. At this scale it's fine.
// If it were a large state I'd reach for another option like Zustand.
// In a real app most of this would be server state (backend + DB)
export const LineItemsProvider = ({
  children,
  initialLineItems,
}: LineItemsProviderProps): ReactNode => {
  const [{ lineItems, packages, selectedPackageIndex }, dispatch] = useReducer(
    packingReducer,
    initialLineItems,
    createInitialState,
  )
  const { shipPackages, loading } = useShipping(dispatch)
  const { add: addToast } = useToast()

  const selectedPackageData = packages[selectedPackageIndex]?.data

  const readyForShipping =
    lineItems.length === 0 &&
    !packages.some((pkg) => !pkg.data.line_items.length)

  const setSelectedPackageIndex = (index: number): void => {
    dispatch({ type: 'SELECT_PACKAGE', index })
  }

  const packProduct = (
    item: LineItemType | undefined,
    packageId: number,
    quantity: number,
  ): void => {
    if (!item) {
      addToast({
        title: 'Product not found',
        description: 'Could not find the product.',
        type: 'error',
      })
      return
    }

    if (quantity <= 0 || quantity > item.quantity) {
      addToast(INVALID_QUANTITY)
      return
    }

    dispatch({ type: 'PACK_PRODUCT', item, packageId, quantity })

    addToast({
      title: 'Product packed',
      description: `${quantity} product(s) packed successfully.`,
      type: 'success',
    })
  }

  const addPackage = (): void => {
    dispatch({ type: 'ADD_PACKAGE' })
    addToast({
      title: 'Package created',
      description: 'New package created successfully.',
      type: 'success',
    })
  }

  const removePackage = (packageId: number, force = false): void => {
    dispatch({ type: 'REMOVE_PACKAGE', packageId, force })
  }

  const updateItemQuantity = (
    packageId: number,
    itemId: number,
    newQuantity: number,
  ): void => {
    if (newQuantity < 0) {
      addToast(INVALID_QUANTITY)
      return
    }

    dispatch({ type: 'UPDATE_ITEM_QUANTITY', packageId, itemId, newQuantity })

    if (newQuantity === 0) {
      addToast({
        title: 'Product unpacked',
        description: 'Product unpacked successfully.',
        type: 'success',
      })
    }
  }

  // Just an extra for a demo to reset back to the initial state without refetching.
  const resetDemo = (): void => {
    dispatch({ type: 'RESET', items: initialLineItems })
  }

  const value: LineItemsContextType = {
    lineItems,
    packages,
    selectedPackageIndex,
    setSelectedPackageIndex,
    selectedPackageData,
    readyForShipping,
    packProduct,
    addPackage,
    removePackage,
    updateItemQuantity,
    shipPackages,
    resetDemo,
    loading,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = (): LineItemsContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useLineItems must be used within a LineItemsProvider')
  }
  return context
}
