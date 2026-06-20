import type { PackedItem, LineItemType } from 'types'

const makeLineItem = (overrides: Partial<LineItemType> = {}): LineItemType => ({
  id: 1,
  quantity: 1,
  sku: 'SKU-DEFAULT',
  location: 'A1',
  ...overrides,
})

export const mockPackedItems: PackedItem[] = [
  {
    label: 'Package 1',
    disabled: false,
    value: 0,
    data: {
      id: 101,
      line_items: [
        makeLineItem({ id: 10, sku: 'SKU-1', quantity: 2 }),
        makeLineItem({ id: 11, sku: 'SKU-2', quantity: 1 }),
      ],
    },
  },
  {
    label: 'Package 2',
    disabled: false,
    value: 1,
    data: {
      id: 102,
      line_items: [],
    },
  },
  {
    label: 'Package 3',
    disabled: true,
    value: 2,
    data: {
      id: 103,
      line_items: [makeLineItem({ id: 12, sku: 'SKU-3', quantity: 5 })],
    },
  },
]
