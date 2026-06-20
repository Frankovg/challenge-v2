import type { LineItemType } from 'types'

/** Finds an unpacked product by its SKU. */
export const getProductByCode = (
  items: LineItemType[],
  code: string,
): LineItemType | undefined => {
  return items.find((item) => item.sku === code)
}

/** Subtracts a quantity from an item, dropping it when it reaches 0. */
export const reduceLineItemQuantity = (
  lineItems: LineItemType[],
  itemId: number,
  quantityToRemove: number,
): LineItemType[] => {
  return lineItems.reduce<LineItemType[]>((acc, item) => {
    if (item.id !== itemId) {
      acc.push(item)
      return acc
    }

    const remainingQuantity = item.quantity - quantityToRemove
    if (remainingQuantity > 0) {
      acc.push({ ...item, quantity: remainingQuantity })
    }

    return acc
  }, [])
}

/** Returns items to the unpacked list, merging into existing entries. */
export const restoreItems = (
  items: LineItemType[],
  itemsToReturn: LineItemType[],
): LineItemType[] => {
  const updatedItems = [...items]

  itemsToReturn.forEach((item) => {
    const existingItemIndex = updatedItems.findIndex((li) => li.id === item.id)

    if (existingItemIndex >= 0) {
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity,
      }
    } else {
      updatedItems.push(item)
    }
  })

  return updatedItems
}

/**
 * Reconciles the unpacked list after a packed item's quantity changes.
 * - newQuantity 0: the whole packed amount returns to the unpacked list.
 * - quantityDiff > 0: the freed amount is added back.
 * - quantityDiff < 0: the extra packed amount is taken from the unpacked list.
 */
export const adjustLineItemsAfterUpdate = (
  lineItems: LineItemType[],
  itemToUpdate: LineItemType,
  itemId: number,
  newQuantity: number,
  quantityDiff: number,
): LineItemType[] => {
  const existingItem = lineItems.find((li) => li.id === itemId)

  if (newQuantity === 0) {
    if (existingItem) {
      return lineItems.map((li) =>
        li.id === itemId
          ? { ...li, quantity: li.quantity + itemToUpdate.quantity }
          : li,
      )
    }
    return [...lineItems, { ...itemToUpdate, quantity: itemToUpdate.quantity }]
  }

  if (quantityDiff > 0) {
    if (existingItem) {
      return lineItems.map((li) =>
        li.id === itemId ? { ...li, quantity: li.quantity + quantityDiff } : li,
      )
    }
    return [...lineItems, { ...itemToUpdate, quantity: quantityDiff }]
  }

  if (quantityDiff < 0) {
    return reduceLineItemQuantity(lineItems, itemId, Math.abs(quantityDiff))
  }

  return lineItems
}
