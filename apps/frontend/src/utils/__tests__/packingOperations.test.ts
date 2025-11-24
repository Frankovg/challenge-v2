import { updatePackagesWithItem } from 'utils/updatePackagesWithItem'

import { reduceLineItemQuantity } from '../reduceLineItemQuantity'

import { mockItem, mockLineItems, mockPackages } from './mocks'

import type { PackedItem } from 'types'

describe('packingOperations', (): void => {
  describe('updatePackagesWithItem', (): void => {
    it('should add a new item to an empty package', (): void => {
      const packageId = 0
      const quantity = 3

      const result = updatePackagesWithItem(mockPackages, mockItem, packageId, quantity)

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
      const packageId = 0
      const quantity = 3

      const result = updatePackagesWithItem(packagesWithExistingItem, mockItem, packageId, quantity)

      expect(result[0].data.line_items).toHaveLength(1)
      expect(result[0].data.line_items[0].quantity).toBe(8) // 5 + 3
    })

    it('should only modify the target package', (): void => {
      const packageId = 0
      const quantity = 3

      const result = updatePackagesWithItem(mockPackages, mockItem, packageId, quantity)

      expect(result[0].data.line_items).toHaveLength(1)
      expect(result[1]).toEqual(mockPackages[1])
    })
  })

  describe('reduceLineItemQuantity', (): void => {
    it('should reduce quantity when remaining quantity is greater than 0', (): void => {
      const itemId = 1
      const quantityToRemove = 3

      const result = reduceLineItemQuantity(mockLineItems, itemId, quantityToRemove)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        id: 1,
        quantity: 7,
        sku: 'SKU-001',
        location: 'A1'
      })
    })

    it('should remove item when remaining quantity is 0', (): void => {
      const itemId = 1
      const quantityToRemove = 10

      const result = reduceLineItemQuantity(mockLineItems, itemId, quantityToRemove)

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe(2)
    })
  })
})
