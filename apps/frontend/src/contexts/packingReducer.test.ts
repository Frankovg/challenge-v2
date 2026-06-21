import { mockLineItems, mockPackages } from 'utils/__tests__/mocks'

import {
  createInitialState,
  packingReducer,
  type PackingState,
} from './packingReducer'

import type { LineItemType } from 'types'

const baseState = (overrides: Partial<PackingState> = {}): PackingState => ({
  ...createInitialState(mockLineItems),
  ...overrides,
})

describe('packingReducer', () => {
  describe('PACK_PRODUCT', () => {
    it('adds the item to the package and reduces the unpacked stock atomically', () => {
      const item = mockLineItems[0] // id 1, qty 10
      const next = packingReducer(baseState(), {
        type: 'PACK_PRODUCT',
        item,
        packageId: 0,
        quantity: 3,
      })

      // packed into package 0
      expect(next.packages[0].data.line_items).toEqual([
        { ...item, quantity: 3 },
      ])
      // and removed from the unpacked stock in the same transition
      expect(next.lineItems.find((li) => li.id === 1)?.quantity).toBe(7)
    })

    it('drops the line item from stock when the full quantity is packed', () => {
      const item = mockLineItems[1] // id 2, qty 5
      const next = packingReducer(baseState(), {
        type: 'PACK_PRODUCT',
        item,
        packageId: 0,
        quantity: 5,
      })

      expect(next.lineItems.some((li) => li.id === 2)).toBe(false)
    })
  })

  describe('UPDATE_ITEM_QUANTITY', () => {
    const stateWithPacked = baseState({
      packages: mockPackages, // package 1 holds item id 2, qty 5
      lineItems: [],
    })

    it('unpacks the item back to stock when set to 0', () => {
      const next = packingReducer(stateWithPacked, {
        type: 'UPDATE_ITEM_QUANTITY',
        packageId: 1,
        itemId: 2,
        newQuantity: 0,
      })

      // gone from the package
      expect(next.packages[1].data.line_items).toHaveLength(0)
      // restored to stock
      expect(next.lineItems.find((li) => li.id === 2)?.quantity).toBe(5)
    })

    it('is a no-op when the item is not in the package', () => {
      const next = packingReducer(stateWithPacked, {
        type: 'UPDATE_ITEM_QUANTITY',
        packageId: 1,
        itemId: 999,
        newQuantity: 0,
      })

      expect(next).toBe(stateWithPacked)
    })
  })

  describe('ADD_PACKAGE', () => {
    it('appends a new empty package', () => {
      const next = packingReducer(baseState(), { type: 'ADD_PACKAGE' })
      expect(next.packages).toHaveLength(2)
      expect(next.packages[1].data.line_items).toHaveLength(0)
    })
  })

  describe('REMOVE_PACKAGE', () => {
    it('does nothing when removing the only empty package', () => {
      const state = baseState()
      const next = packingReducer(state, {
        type: 'REMOVE_PACKAGE',
        packageId: 0,
      })
      expect(next).toBe(state)
    })

    it('refuses to remove a non-empty package without force', () => {
      const state = baseState({ packages: mockPackages, lineItems: [] })
      const next = packingReducer(state, {
        type: 'REMOVE_PACKAGE',
        packageId: 1,
      })
      expect(next).toBe(state)
    })

    it('removes, reindexes tabs and restores items when forced', () => {
      const state = baseState({ packages: mockPackages, lineItems: [] })
      const next = packingReducer(state, {
        type: 'REMOVE_PACKAGE',
        packageId: 1,
        force: true,
      })

      // package 1 removed, tabs reindexed
      expect(next.packages).toHaveLength(1)
      expect(next.packages[0].data.id).toBe(0)
      // its item returned to stock
      expect(next.lineItems.find((li) => li.id === 2)?.quantity).toBe(5)
    })
  })

  describe('SELECT_PACKAGE', () => {
    it('updates the selected index', () => {
      const next = packingReducer(baseState(), {
        type: 'SELECT_PACKAGE',
        index: 2,
      })
      expect(next.selectedPackageIndex).toBe(2)
    })
  })

  describe('RESET', () => {
    it('restores initial state with the given items', () => {
      const dirty = baseState({ packages: mockPackages, selectedPackageIndex: 1 })
      const items: LineItemType[] = [mockLineItems[0]]
      const next = packingReducer(dirty, { type: 'RESET', items })

      expect(next.lineItems).toEqual(items)
      expect(next.packages).toHaveLength(1)
      expect(next.selectedPackageIndex).toBe(0)
    })
  })

  describe('CLEAR_PACKAGES', () => {
    it('resets packages and selection but leaves stock untouched', () => {
      const state = baseState({ packages: mockPackages, selectedPackageIndex: 1 })
      const next = packingReducer(state, { type: 'CLEAR_PACKAGES' })

      expect(next.packages).toHaveLength(1)
      expect(next.selectedPackageIndex).toBe(0)
      expect(next.lineItems).toBe(state.lineItems)
    })
  })
})
