import { reduceLineItemQuantity, updatePackagesWithItem } from '../packageOperations'

import { mockItem, mockLineItems, mockPackages } from './mocks'

import type { PackedItem } from 'types'

describe('packageOperations', (): void => {
  describe('updatePackagesWithItem', (): void => {
    it('should add a new item to an empty package', (): void => {
      const result = updatePackagesWithItem(mockPackages, mockItem, 0, 3)

      expect(result[0].data.line_items).toHaveLength(1)
      expect(result[0].data.line_items[0]).toEqual({
        id: 1,
        quantity: 3,
        sku: 'TEST-SKU-001',
        location: 'A1'
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
              {
                id: 1,
                quantity: 5,
                sku: 'TEST-SKU-001',
                location: 'A1'
              }
            ]
          }
        }
      ]

      const result = updatePackagesWithItem(packagesWithExistingItem, mockItem, 0, 3)

      expect(result[0].data.line_items).toHaveLength(1)
      expect(result[0].data.line_items[0].quantity).toBe(8) // 5 + 3
    })

    it('should only modify the target package', (): void => {
      const result = updatePackagesWithItem(mockPackages, mockItem, 0, 3)

      // Package 0 should be updated
      expect(result[0].data.line_items).toHaveLength(1)
      // Package 1 should remain unchanged
      expect(result[1]).toEqual(mockPackages[1])
    })

    it('should not mutate the original packages array', (): void => {
      const originalPackages = JSON.parse(JSON.stringify(mockPackages))

      updatePackagesWithItem(mockPackages, mockItem, 0, 3)

      expect(mockPackages).toEqual(originalPackages)
    })
  })

  describe('reduceLineItemQuantity', (): void => {
    it('should reduce quantity when remaining quantity is greater than 0', (): void => {
      const result = reduceLineItemQuantity(mockLineItems, 1, 3)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        id: 1,
        quantity: 7,
        sku: 'SKU-001',
        location: 'A1'
      })
    })

    it('should remove item when remaining quantity is 0', (): void => {
      const result = reduceLineItemQuantity(mockLineItems, 1, 10)

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe(2)
    })

    it('should not modify other items in the array', (): void => {
      const result = reduceLineItemQuantity(mockLineItems, 1, 5)

      expect(result[1]).toEqual(mockLineItems[1])
      expect(result[2]).toEqual(mockLineItems[2])
    })

    it('should not mutate the original array', (): void => {
      const originalLineItems = JSON.parse(JSON.stringify(mockLineItems))

      reduceLineItemQuantity(mockLineItems, 1, 3)

      expect(mockLineItems).toEqual(originalLineItems)
    })
  })
})
