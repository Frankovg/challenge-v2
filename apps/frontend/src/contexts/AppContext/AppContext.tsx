'use client'

import { Toast } from "@base-ui-components/react/toast";
import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { usePackItemsMutation } from 'hooks/usePackItemsMutation'
import { sleep } from "lib/sleep";
import { adjustLineItemsAfterUpdate } from 'utils/adjustLineItemsAfterUpdate'
import { createPackage } from 'utils/createPackage'
import { rebuildPackageTabs } from "utils/rebuildPackageTabs";
import { reduceLineItemQuantity } from 'utils/reduceLineItemQuantity'
import { restoreItems } from "utils/restoreItems";
import { selectPackage } from "utils/selectPackage";
import { updatePackageItemQuantity } from "utils/updatePackageItemQuantity";
import { updatePackagesWithItem } from "utils/updatePackagesWithItem";

import { INITIAL_PACKAGE } from "./const";

import type { LineItemsContextType, PackedItem, LineItemType, PackedPackage } from 'types'

export const AppContext = createContext<LineItemsContextType | undefined>(undefined)

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
  const [loading, setLoading] = useState(false)

  const { packItems, error } = usePackItemsMutation()

  const toastManager = Toast.useToastManager();

  const selectedPackageData = useMemo(() => packages[selectedPackageIndex]?.data, [packages, selectedPackageIndex])

  const readyForShipping = useMemo(() => {
    const allItemsPacked = lineItems.length === 0
    const allPackagesCompleted = !(packages.some((pkg) => !pkg.data.line_items.length))
    return allItemsPacked && allPackagesCompleted
  }, [lineItems, packages])


  const packProduct = useCallback((item: LineItemType | undefined, packageId: number, quantity: number): void => {
    if (!item) {
      toastManager.add({
        title: "Product not found",
        description: "Could not find the product.",
        type: "error",
      })
      return
    }

    if (quantity <= 0 || quantity > item.quantity) {
      toastManager.add({
        title: "Invalid quantity",
        description: "Please enter a valid amount.",
        type: "error",
      })
      return
    }

    setPackages(prev => updatePackagesWithItem(prev, item, packageId, quantity))
    setLineItems(prev => reduceLineItemQuantity(prev, item.id, quantity))

    toastManager.add({
      title: "Product packed",
      description: `${quantity} product(s) packed successfully.`,
      type: "success",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const addPackage = useCallback((): void => {
    setPackages(prev => createPackage(prev))
    toastManager.add({
      title: "Package created",
      description: 'New package created successfully.',
      type: "success",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (newQuantity < 0) {
      toastManager.add({
        title: "Invalid quantity",
        description: "Please enter a valid amount.",
        type: "error",
      })
      return
    }

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

    if (newQuantity === 0) {
      toastManager.add({
        title: "Product unpacked",
        description: 'Product unpacked successfully.',
        type: "success",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const shipPackages = useCallback(async (items: PackedPackage[], ready: boolean) => {
    if (!ready) {
      toastManager.add({
        title: 'Shipping Error',
        description: 'Complete or remove empty packages.',
        type: 'error',
      })
      return
    }

    try {
      setLoading(true)
      if (process.env.NODE_ENV === "development") {
        await sleep(1000);
      }

      const result = await packItems(items)

      setPackages(INITIAL_PACKAGE)
      setSelectedPackageIndex(0)

      if (process.env.NODE_ENV === 'development') console.log("Packed: ", result)

      toastManager.add({
        title: "Shipment created successfully",
        description: `${items.length} package(s) ready to ship.`,
        type: "success",
      })
      setLoading(false)
    } catch {
      if (process.env.NODE_ENV === 'development') console.error(error)

      toastManager.add({
        title: 'Shipping Error',
        description: 'Unable to process shipping.',
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const resetDemo = useCallback((items: LineItemType[]) => {
    setLineItems(items)
    setSelectedPackageIndex(0)
    setPackages(INITIAL_PACKAGE)
  }, [])


  return (
    <AppContext.Provider
      value={{
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
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
