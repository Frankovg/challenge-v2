import { PackedItem } from "types"

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
