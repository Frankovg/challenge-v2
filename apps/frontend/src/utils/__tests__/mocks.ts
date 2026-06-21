import type { LineItemType, PackedItem } from 'types'

export const mockLineItems: LineItemType[] = [
  {
    id: 1,
    quantity: 10,
    sku: 'SKU-001',
    location: 'A1',
  },
  {
    id: 2,
    quantity: 5,
    sku: 'SKU-002',
    location: 'B2',
  },
  {
    id: 3,
    quantity: 8,
    sku: 'SKU-003',
    location: 'C3',
  },
]

export const mockPackages: PackedItem[] = [
  {
    value: 0,
    label: 'Package 1',
    data: {
      id: 0,
      line_items: [],
    },
  },
  {
    value: 1,
    label: 'Package 2',
    data: {
      id: 1,
      line_items: [
        {
          id: 2,
          quantity: 5,
          sku: 'EXISTING-SKU',
          location: 'B2',
        },
      ],
    },
  },
]

export const mockItem: LineItemType = {
  id: 1,
  quantity: 10,
  sku: 'TEST-SKU-001',
  location: 'A1',
}
