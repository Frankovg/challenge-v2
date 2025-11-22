import type { PackedItem } from "types"

export const addPackageOperations = (
  packages: PackedItem[]
) => {
  const ids = packages.map(p => p.data.id)
  const values = packages.map(p => p.value)
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 0
  const newValue = values.length > 0 ? Math.max(...values) + 1 : 0

  return [
    ...packages,
    {
      value: newValue,
      label: `Package ${newValue + 1}`,
      data: {
        id: newId,
        line_items: []
      }
    }
  ]
}
