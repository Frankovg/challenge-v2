'use client'

import React, {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'

import { useToast } from 'components/ui/Toast'
import { usePackItemsMutation } from 'hooks/usePackItemsMutation'
import { sleep } from 'lib/sleep'

import { createInitialState, packingReducer } from './packingReducer'

import type {
  LineItemsContextType,
  LineItemType,
  PackedPackage,
} from 'types'

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

export const LineItemsProvider = ({
  children,
  initialLineItems,
}: LineItemsProviderProps): ReactNode => {
  const [{ lineItems, packages, selectedPackageIndex }, dispatch] = useReducer(
    packingReducer,
    initialLineItems,
    createInitialState,
  )
  const [loading, setLoading] = useState(false)

  const { packItems, error } = usePackItemsMutation()
  const { add: addToast } = useToast()

  const selectedPackageData = useMemo(
    () => packages[selectedPackageIndex]?.data,
    [packages, selectedPackageIndex],
  )

  const readyForShipping = useMemo(() => {
    const allItemsPacked = lineItems.length === 0
    const allPackagesCompleted = !packages.some(
      (pkg) => !pkg.data.line_items.length,
    )
    return allItemsPacked && allPackagesCompleted
  }, [lineItems, packages])

  const setSelectedPackageIndex = useCallback((index: number): void => {
    dispatch({ type: 'SELECT_PACKAGE', index })
  }, [])

  const packProduct = useCallback(
    (
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
    },
    [addToast],
  )

  const addPackage = useCallback((): void => {
    dispatch({ type: 'ADD_PACKAGE' })
    addToast({
      title: 'Package created',
      description: 'New package created successfully.',
      type: 'success',
    })
  }, [addToast])

  const removePackage = useCallback(
    (packageId: number, force = false): void => {
      dispatch({ type: 'REMOVE_PACKAGE', packageId, force })
    },
    [],
  )

  const updateItemQuantity = useCallback(
    (packageId: number, itemId: number, newQuantity: number): void => {
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
    },
    [addToast],
  )

  const shipPackages = useCallback(
    async (items: PackedPackage[], ready: boolean): Promise<void> => {
      if (!ready) {
        addToast({
          title: 'Shipping Error',
          description: 'Complete or remove empty packages.',
          type: 'error',
        })
        return
      }

      try {
        setLoading(true)
        if (process.env.NODE_ENV === 'development') {
          await sleep(1000)
        }

        const result = await packItems(items)

        dispatch({ type: 'CLEAR_PACKAGES' })

        if (process.env.NODE_ENV === 'development')
          console.log('Packed: ', result)

        addToast({
          title: 'Shipment created successfully',
          description: `${items.length} package(s) ready to ship.`,
          type: 'success',
        })
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err)
          console.error(error)
        }

        addToast({
          title: 'Shipping Error',
          description: 'Unable to process shipping.',
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, packItems, error],
  )

  const resetDemo = useCallback((items: LineItemType[]): void => {
    dispatch({ type: 'RESET', items })
  }, [])

  const value = useMemo<LineItemsContextType>(
    () => ({
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
    }),
    [
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
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
