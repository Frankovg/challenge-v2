import { type PackedItem } from "types"

export const rebuildPackageTabs = (packages: PackedItem[], packageId: number) => {
  return packages
    .filter(pkg => pkg.data.id !== packageId)
    .map((pkg, index) => ({
      ...pkg,
      value: index,
      label: `Package ${index + 1}`
    }))
}
