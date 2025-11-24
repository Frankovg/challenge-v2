import type { LineItemType } from 'types'

export const reduceLineItemQuantity = (
  lineItems: LineItemType[],
  itemId: number,
  quantityToRemove: number
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
