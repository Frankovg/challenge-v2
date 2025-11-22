import {
  adjustLineItemsAfterUpdate,
  updatePackageItemQuantity,
} from '../updateQuantityOperations'

import { mockLineItems } from './mocks'

import type { LineItemType, PackedItem } from 'types'

describe('updateQuantityOperations', () => {
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
          line_items: [
            { ...mockLineItems[2], quantity: 2 },
          ],
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

    it('does not modify other packages', () => {
      const result = updatePackageItemQuantity(packagesWithItems, 0, 1, 10)

      expect(result[1]).toEqual(packagesWithItems[1])
    })
  })

  describe('adjustLineItemsAfterUpdate', () => {
    const mockReduceLineItemQuantity = (
      items: LineItemType[],
      itemId: number,
      quantity: number
    ): LineItemType[] => {
      return items.reduce<LineItemType[]>((acc, item) => {
        if (item.id !== itemId) {
          acc.push(item)
          return acc
        }
        const remainingQuantity = item.quantity - quantity
        if (remainingQuantity > 0) {
          acc.push({ ...item, quantity: remainingQuantity })
        }
        return acc
      }, [])
    }

    describe('when item is completely removed (newQuantity = 0)', () => {
      it('returns all items to unpacked when existing item found', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 3 },
          { ...mockLineItems[1], quantity: 2 },
        ]

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          0,
          5,
          mockReduceLineItemQuantity
        )

        expect(result[0].quantity).toBe(8) // 3 + 5
        expect(result[1].quantity).toBe(2)
      })

      it('adds item back to unpacked when not existing', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[1], quantity: 2 },
        ]

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          0,
          5,
          mockReduceLineItemQuantity
        )

        expect(result).toHaveLength(2)
        expect(result[1].id).toBe(mockLineItems[0].id)
        expect(result[1].quantity).toBe(5)
      })
    })

    describe('when quantity decreased (quantityDiff > 0)', () => {
      it('adds difference to existing unpacked item', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 2 },
        ]

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          3,
          2,
          mockReduceLineItemQuantity
        )

        expect(result[0].quantity).toBe(4) // 2 + 2
      })

      it('creates new unpacked item when not existing', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = []

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          3,
          2,
          mockReduceLineItemQuantity
        )

        expect(result).toHaveLength(1)
        expect(result[0].quantity).toBe(2)
      })
    })

    describe('when quantity increased (quantityDiff < 0)', () => {
      it('reduces unpacked items using reducer function', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 5 },
        ]

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          7,
          -2,
          mockReduceLineItemQuantity
        )

        expect(result[0].quantity).toBe(3) // 5 - 2
      })

      it('removes item completely when quantity reaches 0', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 2 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 2 },
        ]

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          7,
          -2,
          mockReduceLineItemQuantity
        )

        expect(result).toHaveLength(0)
      })
    })

    describe('when quantity unchanged (quantityDiff = 0)', () => {
      it('returns items unchanged', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 5 },
        ]

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          mockLineItems[0].id,
          5,
          0,
          mockReduceLineItemQuantity
        )

        expect(result).toEqual(lineItems)
      })
    })
  })
})
