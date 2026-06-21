import type { LineItemType } from 'types'

/**
 * Returns every inventory record matching a SKU.
 *
 * A SKU is NOT unique: the same product can live in several locations/bins
 * (the mock has `green-ball` in both `a1` and `a4`). So a scan resolves to a
 * list of locations, not a single row — the caller then picks which location
 * to draw from.
 *
 * SCALE: linear scan over the in-memory list. With thousands of products this
 * should be a server-side indexed lookup (`query line_items(sku: $sku)`)
 * returning only the matching rows, not the whole inventory filtered here.
 */
export const getProductsByCode = (
  items: LineItemType[],
  code: string,
): LineItemType[] => {
  return items.filter((item) => item.sku === code)
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
