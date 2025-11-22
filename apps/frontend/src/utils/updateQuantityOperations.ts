import type { LineItemType, PackedItem } from 'types'

export const updatePackageItemQuantity = (
  packages: PackedItem[],
  packageId: number,
  itemId: number,
  newQuantity: number
): PackedItem[] => {
  return packages.map(pkg => {
    if (pkg.data.id !== packageId) return pkg

    if (newQuantity === 0) {
      return {
        ...pkg,
        data: {
          ...pkg.data,
          line_items: pkg.data.line_items.filter(li => li.id !== itemId)
        }
      }
    }

    return {
      ...pkg,
      data: {
        ...pkg.data,
        line_items: pkg.data.line_items.map(li =>
          li.id === itemId ? { ...li, quantity: newQuantity } : li
        )
      }
    }
  })
}

export const adjustLineItemsAfterUpdate = (
  lineItems: LineItemType[],
  itemToUpdate: LineItemType,
  itemId: number,
  newQuantity: number,
  quantityDiff: number,
  reduceLineItemQuantity: (items: LineItemType[], id: number, qty: number) => LineItemType[]
): LineItemType[] => {
  const existingItem = lineItems.find(li => li.id === itemId)

  if (newQuantity === 0) {
    if (existingItem) {
      return lineItems.map(li =>
        li.id === itemId
          ? { ...li, quantity: li.quantity + itemToUpdate.quantity }
          : li
      )
    }
    return [...lineItems, { ...itemToUpdate, quantity: itemToUpdate.quantity }]
  }

  if (quantityDiff > 0) {
    if (existingItem) {
      return lineItems.map(li =>
        li.id === itemId ? { ...li, quantity: li.quantity + quantityDiff } : li
      )
    }
    return [...lineItems, { ...itemToUpdate, quantity: quantityDiff }]
  }

  if (quantityDiff < 0) {
    return reduceLineItemQuantity(lineItems, itemId, Math.abs(quantityDiff))
  }

  return lineItems
}
