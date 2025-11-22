import type { PackedItem } from "types"

export const rebuildPackageTabs = (packages: PackedItem[], packageId: number) => {
  return packages
    .filter(pkg => pkg.data.id !== packageId)
    .map((pkg, index) => ({
      ...pkg,
      value: index,
      label: `Package ${index + 1}`
    }))
}

export const selectPackage = (
  removedPackageIndex: number,
  prevIndex: number,
  packagesLength: number
) => {
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
