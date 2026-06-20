import {
  adjustLineItemsAfterUpdate,
  getProductByCode,
  reduceLineItemQuantity,
  restoreItems,
} from '../lineItemOperations'

import { mockLineItems } from './mocks'

import type { LineItemType } from 'types'

describe('getProductByCode', () => {
  it('should return the correct product when code matches', () => {
    const result = getProductByCode(mockLineItems, 'SKU-002')
    expect(result).toEqual({ id: 2, quantity: 5, sku: 'SKU-002', location: 'B2' })
  })

  it('should return undefined when code does not match any product', () => {
    expect(getProductByCode(mockLineItems, 'SKU-D000')).toBeUndefined()
  })

  it('should return undefined when items array is empty', () => {
    expect(getProductByCode([], 'SKU-002')).toBeUndefined()
  })
})

describe('reduceLineItemQuantity', (): void => {
  it('should reduce quantity when remaining quantity is greater than 0', (): void => {
    const result = reduceLineItemQuantity(mockLineItems, 1, 3)

    expect(result).toHaveLength(3)
    expect(result[0]).toEqual({ id: 1, quantity: 7, sku: 'SKU-001', location: 'A1' })
  })

  it('should remove item when remaining quantity is 0', (): void => {
    const result = reduceLineItemQuantity(mockLineItems, 1, 10)

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(2)
  })
})

describe('restoreItems', () => {
  it('adds multiple quantities to multiple matching items', () => {
    const itemsToReturn = [
      { id: 1, quantity: 2, sku: 'SKU-001', location: 'A1' },
      { id: 2, quantity: 3, sku: 'SKU-002', location: 'B2' },
    ]

    const result = restoreItems(mockLineItems, itemsToReturn)

    expect(result.find((i) => i.id === 1)?.quantity).toBe(12)
    expect(result.find((i) => i.id === 2)?.quantity).toBe(8)
  })

  it('adds a new item when it does not exist in the list', () => {
    const itemsToReturn = [{ id: 999, quantity: 4, sku: 'SKU-999', location: 'Z9' }]

    const result = restoreItems(mockLineItems, itemsToReturn)

    expect(result.length).toBe(4)
    expect(result.find((i) => i.id === 999)).toEqual({
      id: 999,
      quantity: 4,
      sku: 'SKU-999',
      location: 'Z9',
    })
  })

  it('returns original items when itemsToReturn is empty', () => {
    expect(restoreItems(mockLineItems, [])).toEqual(mockLineItems)
  })
})

describe('adjustLineItemsAfterUpdate', () => {
  describe('when item is completely removed (newQuantity = 0)', () => {
    it('returns all items to unpacked products list when existing item found', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
      const lineItems: LineItemType[] = [
        { ...mockLineItems[0], quantity: 3 },
        { ...mockLineItems[1], quantity: 2 },
      ]

      const result = adjustLineItemsAfterUpdate(lineItems, itemToUpdate, mockLineItems[0].id, 0, 5)

      expect(result[0].quantity).toBe(8)
      expect(result[1].quantity).toBe(2)
    })

    it('adds item back to unpacked products list when not existing', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
      const lineItems: LineItemType[] = [{ ...mockLineItems[1], quantity: 2 }]

      const result = adjustLineItemsAfterUpdate(lineItems, itemToUpdate, mockLineItems[0].id, 0, 5)

      expect(result).toHaveLength(2)
      expect(result[1].id).toBe(mockLineItems[0].id)
      expect(result[1].quantity).toBe(5)
    })
  })

  it('creates new unpacked product when not existing', () => {
    const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
    const lineItems: LineItemType[] = []

    const result = adjustLineItemsAfterUpdate(lineItems, itemToUpdate, mockLineItems[0].id, 3, 2)

    expect(result).toHaveLength(1)
    expect(result[0].quantity).toBe(2)
  })

  describe('when quantity decreased (quantityDiff > 0)', () => {
    it('adds difference to existing unpacked product', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
      const lineItems: LineItemType[] = [{ ...mockLineItems[0], quantity: 2 }]

      const result = adjustLineItemsAfterUpdate(lineItems, itemToUpdate, mockLineItems[0].id, 3, 2)

      expect(result[0].quantity).toBe(4)
    })
  })

  describe('when quantity increased (quantityDiff < 0)', () => {
    it('reduces unpacked items using the reducer', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 5 }
      const lineItems: LineItemType[] = [{ ...mockLineItems[0], quantity: 5 }]

      const result = adjustLineItemsAfterUpdate(lineItems, itemToUpdate, mockLineItems[0].id, 7, -2)

      expect(result[0].quantity).toBe(3)
    })

    it('removes item completely when quantity reaches 0', () => {
      const itemToUpdate = { ...mockLineItems[0], quantity: 2 }
      const lineItems: LineItemType[] = [{ ...mockLineItems[0], quantity: 2 }]

      const result = adjustLineItemsAfterUpdate(lineItems, itemToUpdate, mockLineItems[0].id, 7, -2)

      expect(result).toHaveLength(0)
    })
  })
})
