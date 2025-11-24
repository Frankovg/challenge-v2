import type { LineItemType } from "types"

export const restoreItems = (
  items: LineItemType[],
  itemsToReturn: LineItemType[]
) => {
  const updatedItems = [...items]

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
}
