import {
  createPackage,
  rebuildPackageTabs,
  selectPackage,
  updatePackageItemQuantity,
  updatePackagesWithItem,
} from '../packageOperations'

import { mockItem, mockLineItems, mockPackages } from './mocks'

import type { PackedItem } from 'types'

describe('createPackage', (): void => {
  it('should add a new package with incremented id and value', (): void => {
    const result = createPackage(mockPackages)

    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({
      value: 2,
      label: 'Package 3',
      data: {
        id: 2,
        line_items: [],
      },
    })
  })

  it('should create first package with id 0 and value 0 when packages array is empty', (): void => {
    const result = createPackage([])

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      value: 0,
      label: 'Package 1',
      data: {
        id: 0,
        line_items: [],
      },
    })
  })

  it('should preserve existing packages in the array', (): void => {
    const result = createPackage(mockPackages)

    expect(result[0]).toEqual(mockPackages[0])
    expect(result[1]).toEqual(mockPackages[1])
  })

  it('should handle non-sequential package ids correctly', (): void => {
    const nonSequentialPackages: PackedItem[] = [
      { value: 0, label: 'Package 1', data: { id: 5, line_items: [] } },
      { value: 1, label: 'Package 2', data: { id: 10, line_items: [] } },
    ]

    const result = createPackage(nonSequentialPackages)

    expect(result).toHaveLength(3)
    expect(result[2].data.id).toBe(11)
    expect(result[2].value).toBe(2)
  })

  it('should handle non-sequential package values correctly', (): void => {
    const nonSequentialValues: PackedItem[] = [
      { value: 5, label: 'Package 6', data: { id: 0, line_items: [] } },
      { value: 10, label: 'Package 11', data: { id: 1, line_items: [] } },
    ]

    const result = createPackage(nonSequentialValues)

    expect(result).toHaveLength(3)
    expect(result[2].value).toBe(11)
    expect(result[2].label).toBe('Package 12')
    expect(result[2].data.id).toBe(2)
  })

  it('should create new package with empty line_items array', (): void => {
    const result = createPackage(mockPackages)

    expect(result[2].data.line_items).toEqual([])
    expect(Array.isArray(result[2].data.line_items)).toBe(true)
  })

  it('should generate correct label format', (): void => {
    const result = createPackage(mockPackages)
    expect(result[2].label).toBe(`Package ${result[2].value + 1}`)
  })
})

describe('rebuildPackageTabs', () => {
  it('removes the package with the given ID', () => {
    const result = rebuildPackageTabs(mockPackages, 1)

    expect(result.length).toBe(1)
    expect(result[0].data.id).toBe(0)
  })

  it('reindexes the remaining packages', () => {
    const result = rebuildPackageTabs(mockPackages, 1)

    expect(result[0].value).toBe(0)
    expect(result[0].label).toBe('Package 1')
  })
})

describe('selectPackage', () => {
  it('decrements index when removedPackageIndex is less than prevIndex', () => {
    expect(selectPackage(1, 3, 5)).toBe(2)
  })

  it('keeps the same index when removedPackageIndex is greater than prevIndex', () => {
    expect(selectPackage(4, 1, 5)).toBe(1)
  })

  it('returns prevIndex when removed is the same index and not the last package', () => {
    expect(selectPackage(2, 2, 5)).toBe(2)
  })

  it('returns the previous package when removing the last one', () => {
    expect(selectPackage(4, 4, 5)).toBe(3)
  })

  it('returns 0 when removing last package and there are only 2 packages', () => {
    expect(selectPackage(1, 0, 2)).toBe(0)
  })
})

describe('updatePackagesWithItem', (): void => {
  it('should add a new item to an empty package', (): void => {
    const result = updatePackagesWithItem(mockPackages, mockItem, 0, 3)

    expect(result[0].data.line_items).toHaveLength(1)
    expect(result[0].data.line_items[0]).toEqual({
      id: 1,
      quantity: 3,
      sku: 'TEST-SKU-001',
      location: 'A1',
    })
  })

  it('should merge quantities when item already exists in the package', (): void => {
    const packagesWithExistingItem: PackedItem[] = [
      {
        value: 0,
        label: 'Package 1',
        data: {
          id: 0,
          line_items: [
            { id: 1, quantity: 5, sku: 'TEST-SKU-001', location: 'A1' },
          ],
        },
      },
    ]

    const result = updatePackagesWithItem(
      packagesWithExistingItem,
      mockItem,
      0,
      3,
    )

    expect(result[0].data.line_items).toHaveLength(1)
    expect(result[0].data.line_items[0].quantity).toBe(8) // 5 + 3
  })

  it('should only modify the target package', (): void => {
    const result = updatePackagesWithItem(mockPackages, mockItem, 0, 3)

    expect(result[0].data.line_items).toHaveLength(1)
    expect(result[1]).toEqual(mockPackages[1])
  })
})

describe('updatePackageItemQuantity', () => {
  const packagesWithItems: PackedItem[] = [
    {
      value: 0,
      label: 'Package 1',
      data: {
        id: 0,
        line_items: [
          { ...mockLineItems[0], quantity: 5 },
          { ...mockLineItems[1], quantity: 3 },
        ],
      },
    },
    {
      value: 1,
      label: 'Package 2',
      data: {
        id: 1,
        line_items: [{ ...mockLineItems[2], quantity: 2 }],
      },
    },
  ]

  it('updates item quantity in the correct package', () => {
    const result = updatePackageItemQuantity(packagesWithItems, 0, 1, 8)

    expect(result[0].data.line_items[0].quantity).toBe(8)
    expect(result[0].data.line_items[1].quantity).toBe(3)
    expect(result[1].data.line_items[0].quantity).toBe(2)
  })

  it('removes item when quantity is 0', () => {
    const result = updatePackageItemQuantity(packagesWithItems, 0, 1, 0)

    expect(result[0].data.line_items).toHaveLength(1)
    expect(result[0].data.line_items[0].id).toBe(2)
  })
})
