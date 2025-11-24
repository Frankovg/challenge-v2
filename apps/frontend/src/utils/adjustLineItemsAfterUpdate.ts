import type { LineItemType } from 'types'

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
