import { reduceLineItemQuantity } from 'utils/reduceLineItemQuantity'
import { updatePackageItemQuantity } from 'utils/updatePackageItemQuantity'

import { adjustLineItemsAfterUpdate } from '../adjustLineItemsAfterUpdate'

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
      const packageId = 0
      const itemId = 1
      const newQuantity = 8

      const result = updatePackageItemQuantity(packagesWithItems, packageId, itemId, newQuantity)

      expect(result[0].data.line_items[0].quantity).toBe(8)
      expect(result[0].data.line_items[1].quantity).toBe(3)
      expect(result[1].data.line_items[0].quantity).toBe(2)
    })

    it('removes item when quantity is 0', () => {
      const packageId = 0
      const itemId = 1
      const newQuantity = 0

      const result = updatePackageItemQuantity(packagesWithItems, packageId, itemId, newQuantity)

      expect(result[0].data.line_items).toHaveLength(1)
      expect(result[0].data.line_items[0].id).toBe(2)
    })
  })

  describe('adjustLineItemsAfterUpdate', () => {
    // const mockReduceLineItemQuantity = (
    //   items: LineItemType[],
    //   itemId: number,
    //   quantity: number
    // ): LineItemType[] => {
    //   return items.reduce<LineItemType[]>((acc, item) => {
    //     if (item.id !== itemId) {
    //       acc.push(item)
    //       return acc
    //     }
    //     const remainingQuantity = item.quantity - quantity
    //     if (remainingQuantity > 0) {
    //       acc.push({ ...item, quantity: remainingQuantity })
    //     }
    //     return acc
    //   }, [])
    // }

    describe('when item is completely removed (newQuantity = 0)', () => {
      it('returns all items to unpacked products list when existing item found', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 3 },
          { ...mockLineItems[1], quantity: 2 },
        ]

        const itemId = mockLineItems[0].id
        const newQuantity = 0
        const quantityDiff = 5

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          itemId,
          newQuantity,
          quantityDiff,
          reduceLineItemQuantity
        )

        expect(result[0].quantity).toBe(8)
        expect(result[1].quantity).toBe(2)
      })

      it('adds item back to unpacked products list when not existing', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[1], quantity: 2 },
        ]

        const itemId = mockLineItems[0].id
        const newQuantity = 0
        const quantityDiff = 5

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          itemId,
          newQuantity,
          quantityDiff,
          reduceLineItemQuantity
        )

        expect(result).toHaveLength(2)
        expect(result[1].id).toBe(mockLineItems[0].id)
        expect(result[1].quantity).toBe(5)
      })
    })

    it('creates new unpacked product when not existing', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
      const lineItems: LineItemType[] = []

      const itemId = mockLineItems[0].id
      const newQuantity = 3
      const quantityDiff = 2

      const result = adjustLineItemsAfterUpdate(
        lineItems,
        itemToUpdate,
        itemId,
        newQuantity,
        quantityDiff,
        reduceLineItemQuantity
      )

      expect(result).toHaveLength(1)
      expect(result[0].quantity).toBe(2)
    })
  })

  describe('when quantity decreased (quantityDiff > 0)', () => {
    it('adds difference to existing unpacked product', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
      const lineItems: LineItemType[] = [
        { ...mockLineItems[0], quantity: 2 },
      ]

      const itemId = mockLineItems[0].id
      const newQuantity = 3
      const quantityDiff = 2

      const result = adjustLineItemsAfterUpdate(
        lineItems,
        itemToUpdate,
        itemId,
        newQuantity,
        quantityDiff,
        reduceLineItemQuantity
      )

      expect(result[0].quantity).toBe(4)
    })

    describe('when quantity increased (quantityDiff < 0)', () => {
      it('reduces unpacked items using reducer function', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 5 },
        ]

        const itemId = mockLineItems[0].id
        const newQuantity = 7
        const quantityDiff = -2

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          itemId,
          newQuantity,
          quantityDiff,
          reduceLineItemQuantity
        )

        expect(result[0].quantity).toBe(3)
      })

      it('removes item completely when quantity reaches 0', () => {
        const itemToUpdate = { ...mockLineItems[0], quantity: 2 }
        const lineItems: LineItemType[] = [
          { ...mockLineItems[0], quantity: 2 },
        ]

        const itemId = mockLineItems[0].id
        const newQuantity = 7
        const quantityDiff = -2

        const result = adjustLineItemsAfterUpdate(
          lineItems,
          itemToUpdate,
          itemId,
          newQuantity,
          quantityDiff,
          reduceLineItemQuantity
        )

        expect(result).toHaveLength(0)
      })
    })
  })
})
