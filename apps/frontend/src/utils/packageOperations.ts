import type { LineItemType, PackedItem } from 'types'

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

// Removes a package by id and reindexes the remaining tabs.
export const rebuildPackageTabs = (
  packages: PackedItem[],
  packageId: number,
): PackedItem[] => {
  return packages
    .filter((pkg) => pkg.data.id !== packageId)
    .map((pkg, index) => ({
      ...pkg,
      value: index,
      label: `Package ${index + 1}`,
    }))
}

// Recalculate the tab index to select after removing a package.
export const selectPackage = (
  removedPackageIndex: number,
  prevIndex: number,
  packagesLength: number,
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

// Adds an item to a package, merging quantity if it is already present.
export const updatePackagesWithItem = (
  packages: PackedItem[],
  item: LineItemType,
  packageId: number,
  quantity: number,
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
            li.id === item.id
              ? { ...li, quantity: li.quantity + quantity }
              : li,
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

// Sets a packed item's quantity, removing it from the package when 0.
export const updatePackageItemQuantity = (
  packages: PackedItem[],
  packageId: number,
  itemId: number,
  newQuantity: number,
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
          li.id === itemId ? { ...li, quantity: newQuantity } : li,
        ),
      },
    }
  })
}

// Ideally the inventory and the packed amounts live in the DB and the backend
// returns the available quantity directly.
export const getPackedQuantityForId = (
  packages: PackedItem[],
  itemId: number,
): number =>
  packages.reduce(
    (total, pkg) =>
      total +
      pkg.data.line_items
        .filter((li) => li.id === itemId)
        .reduce((sum, li) => sum + li.quantity, 0),
    0,
  )

// If the SKU lives in several locations, this returns the first
// location that still has stock, falling through to the next
// once a location is exhausted. Returns null when every location
// is out of stock.
export const pickAvailableLocation = (
  locations: LineItemType[],
  packages: PackedItem[],
): LineItemType | null => {
  for (const location of locations) {
    const available =
      location.quantity - getPackedQuantityForId(packages, location.id)
    if (available >= 1) return location
  }
  return null
}
