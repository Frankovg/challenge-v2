import { addPackageOperations } from '../addPackageOperations'

import { mockPackages } from './mocks'

import type { PackedItem } from 'types'

describe('addPackageOperations', (): void => {
  it('should add a new package with incremented id and value', (): void => {
    const result = addPackageOperations(mockPackages)

    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({
      value: 2,
      label: 'Package 3',
      data: {
        id: 2,
        line_items: []
      }
    })
  })

  it('should create first package with id 0 and value 0 when packages array is empty', (): void => {
    const result = addPackageOperations([])

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      value: 0,
      label: 'Package 1',
      data: {
        id: 0,
        line_items: []
      }
    })
  })

  it('should preserve existing packages in the array', (): void => {
    const result = addPackageOperations(mockPackages)

    expect(result[0]).toEqual(mockPackages[0])
    expect(result[1]).toEqual(mockPackages[1])
  })

  it('should handle non-sequential package ids correctly', (): void => {
    const nonSequentialPackages: PackedItem[] = [
      {
        value: 0,
        label: 'Package 1',
        data: {
          id: 5,
          line_items: []
        }
      },
      {
        value: 1,
        label: 'Package 2',
        data: {
          id: 10,
          line_items: []
        }
      }
    ]

    const result = addPackageOperations(nonSequentialPackages)

    expect(result).toHaveLength(3)
    expect(result[2].data.id).toBe(11) // Math.max(5, 10) + 1
    expect(result[2].value).toBe(2) // Math.max(0, 1) + 1
  })

  it('should handle non-sequential package values correctly', (): void => {
    const nonSequentialValues: PackedItem[] = [
      {
        value: 5,
        label: 'Package 6',
        data: {
          id: 0,
          line_items: []
        }
      },
      {
        value: 10,
        label: 'Package 11',
        data: {
          id: 1,
          line_items: []
        }
      }
    ]

    const result = addPackageOperations(nonSequentialValues)

    expect(result).toHaveLength(3)
    expect(result[2].value).toBe(11) // Math.max(5, 10) + 1
    expect(result[2].label).toBe('Package 12') // value + 1
    expect(result[2].data.id).toBe(2) // Math.max(0, 1) + 1
  })

  it('should create new package with empty line_items array', (): void => {
    const result = addPackageOperations(mockPackages)

    expect(result[2].data.line_items).toEqual([])
    expect(Array.isArray(result[2].data.line_items)).toBe(true)
  })

  it('should generate correct label format', (): void => {
    const result = addPackageOperations(mockPackages)

    // Label should be "Package {value + 1}"
    expect(result[2].label).toBe(`Package ${result[2].value + 1}`)
  })
})
