import {
  adjustLineItemsAfterUpdate,
  reduceLineItemQuantity,
  restoreItems,
} from 'utils/lineItemOperations'
import {
  createPackage,
  rebuildPackageTabs,
  selectPackage,
  updatePackageItemQuantity,
  updatePackagesWithItem,
} from 'utils/packageOperations'

import type { LineItemType, PackedItem } from 'types'

export const INITIAL_PACKAGE: PackedItem[] = [
  {
    value: 0,
    label: 'Package 1',
    data: {
      id: 0,
      line_items: [],
    },
  },
]

export type PackingState = {
  lineItems: LineItemType[]
  packages: PackedItem[]
  selectedPackageIndex: number
}

export const createInitialState = (
  initialLineItems: LineItemType[],
): PackingState => ({
  lineItems: initialLineItems,
  packages: INITIAL_PACKAGE,
  selectedPackageIndex: 0,
})

export type PackingAction =
  | { type: 'PACK_PRODUCT'; item: LineItemType; packageId: number; quantity: number }
  | { type: 'ADD_PACKAGE' }
  | { type: 'REMOVE_PACKAGE'; packageId: number; force?: boolean }
  | {
    type: 'UPDATE_ITEM_QUANTITY'
    packageId: number
    itemId: number
    newQuantity: number
  }
  | { type: 'SELECT_PACKAGE'; index: number }
  | { type: 'RESET'; items: LineItemType[] }
  | { type: 'CLEAR_PACKAGES' }


// Single source of truth for packing state transitions.
export const packingReducer = (
  state: PackingState,
  action: PackingAction,
): PackingState => {
  switch (action.type) {
    case 'PACK_PRODUCT': {
      const { item, packageId, quantity } = action
      return {
        ...state,
        packages: updatePackagesWithItem(
          state.packages,
          item,
          packageId,
          quantity,
        ),
        lineItems: reduceLineItemQuantity(state.lineItems, item.id, quantity),
      }
    }

    case 'ADD_PACKAGE':
      return { ...state, packages: createPackage(state.packages) }

    case 'REMOVE_PACKAGE': {
      const { packageId, force = false } = action
      const packageToRemove = state.packages.find(
        (pkg) => pkg.data.id === packageId,
      )
      if (!packageToRemove) return state

      const itemsToReturn = packageToRemove.data.line_items
      const hasItems = itemsToReturn.length > 0
      const isSinglePackage = state.packages.length === 1

      // Never drop the only empty package, or a non-empty one without force.
      if ((isSinglePackage && !hasItems) || (hasItems && !force)) return state

      const lineItems = hasItems
        ? restoreItems(state.lineItems, itemsToReturn)
        : state.lineItems

      if (isSinglePackage) {
        return { lineItems, packages: INITIAL_PACKAGE, selectedPackageIndex: 0 }
      }

      const removedPackageIndex = state.packages.findIndex(
        (pkg) => pkg.data.id === packageId,
      )

      return {
        lineItems,
        packages: rebuildPackageTabs(state.packages, packageId),
        selectedPackageIndex: selectPackage(
          removedPackageIndex,
          state.selectedPackageIndex,
          state.packages.length,
        ),
      }
    }

    case 'UPDATE_ITEM_QUANTITY': {
      const { packageId, itemId, newQuantity } = action
      const targetPackage = state.packages.find(
        (pkg) => pkg.data.id === packageId,
      )
      const itemToUpdate = targetPackage?.data.line_items.find(
        (li) => li.id === itemId,
      )
      if (!itemToUpdate) return state

      const quantityDiff = itemToUpdate.quantity - newQuantity

      return {
        ...state,
        packages: updatePackageItemQuantity(
          state.packages,
          packageId,
          itemId,
          newQuantity,
        ),
        lineItems: adjustLineItemsAfterUpdate(
          state.lineItems,
          itemToUpdate,
          itemId,
          newQuantity,
          quantityDiff,
        ),
      }
    }

    case 'SELECT_PACKAGE':
      return { ...state, selectedPackageIndex: action.index }

    case 'RESET':
      return createInitialState(action.items)

    case 'CLEAR_PACKAGES':
      return { ...state, packages: INITIAL_PACKAGE, selectedPackageIndex: 0 }

    default:
      return state
  }
}
