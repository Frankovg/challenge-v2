import type { LineItemType, PackedItem } from 'types'

/** Appends a new empty package, deriving its id/value from the current set. */
export const createPackage = (packages: PackedItem[]): PackedItem[] => {
  const ids = packages.map((p) => p.data.id)
  const values = packages.map((p) => p.value)
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 0
  const newValue = values.length > 0 ? Math.max(...values) + 1 : 0

  return [
    ...packages,
    {
      value: newValue,
      label: `Package ${newValue + 1}`,
      data: {
        id: newId,
        line_items: [],
      },
    },
  ]
}

/** Removes a package by id and reindexes the remaining tabs (value + label). */
export const rebuildPackageTabs = (
  packages: PackedItem[],
  packageId: number
): PackedItem[] => {
  return packages
    .filter((pkg) => pkg.data.id !== packageId)
    .map((pkg, index) => ({
      ...pkg,
      value: index,
      label: `Package ${index + 1}`,
    }))
}

/** Computes the tab index to select after removing a package. */
export const selectPackage = (
  removedPackageIndex: number,
  prevIndex: number,
  packagesLength: number
): number => {
  if (removedPackageIndex < prevIndex) {
    return prevIndex - 1
  }
  if (removedPackageIndex === prevIndex) {
    if (prevIndex >= packagesLength - 1) {
      return Math.max(0, packagesLength - 2)
    }
    return prevIndex
  }
  return prevIndex
}

/** Adds an item to a package, merging quantity if it is already present. */
export const updatePackagesWithItem = (
  packages: PackedItem[],
  item: LineItemType,
  packageId: number,
  quantity: number
): PackedItem[] => {
  return packages.map((pkg) => {
    if (pkg.data.id !== packageId) return pkg

    const existingItem = pkg.data.line_items.find((li) => li.id === item.id)

    if (existingItem) {
      return {
        ...pkg,
        data: {
          ...pkg.data,
          line_items: pkg.data.line_items.map((li) =>
            li.id === item.id ? { ...li, quantity: li.quantity + quantity } : li
          ),
        },
      }
    }

    return {
      ...pkg,
      data: {
        ...pkg.data,
        line_items: [...pkg.data.line_items, { ...item, quantity }],
      },
    }
  })
}

/** Sets a packed item's quantity, removing it from the package when 0. */
export const updatePackageItemQuantity = (
  packages: PackedItem[],
  packageId: number,
  itemId: number,
  newQuantity: number
): PackedItem[] => {
  return packages.map((pkg) => {
    if (pkg.data.id !== packageId) return pkg

    if (newQuantity === 0) {
      return {
        ...pkg,
        data: {
          ...pkg.data,
          line_items: pkg.data.line_items.filter((li) => li.id !== itemId),
        },
      }
    }

    return {
      ...pkg,
      data: {
        ...pkg.data,
        line_items: pkg.data.line_items.map((li) =>
          li.id === itemId ? { ...li, quantity: newQuantity } : li
        ),
      },
    }
  })
}
