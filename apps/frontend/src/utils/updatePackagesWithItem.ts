import type { LineItemType, PackedItem } from "types"

export const updatePackagesWithItem = (
  packages: PackedItem[],
  item: LineItemType,
  packageId: number,
  quantity: number
): PackedItem[] => {
  return packages.map(pkg => {
    if (pkg.data.id !== packageId) return pkg

    const existingItem = pkg.data.line_items.find(li => li.id === item.id)

    if (existingItem) {
      return {
        ...pkg,
        data: {
          ...pkg.data,
          line_items: pkg.data.line_items.map(li =>
            li.id === item.id
              ? { ...li, quantity: li.quantity + quantity }
              : li
          )
        }
      }
    } else {
      return {
        ...pkg,
        data: {
          ...pkg.data,
          line_items: [...pkg.data.line_items, { ...item, quantity }]
        }
      }
    }
  })
}
