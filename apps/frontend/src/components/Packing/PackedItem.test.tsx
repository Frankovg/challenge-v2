import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { useApp } from 'hooks/useApp'
import { LineItemType } from 'types'

import { PackedItem } from './PackedItem'

jest.mock('hooks/useApp')

const mockUpdateItemQuantity = jest.fn()

const mockUseApp = useApp as jest.Mock

const sampleItem: LineItemType = {
  id: 1,
  sku: 'SKU-123',
  location: 'b2',
  quantity: 5,
}

beforeEach(() => {
  mockUseApp.mockReturnValue({
    lineItems: [{ ...sampleItem, quantity: 3 }],
    selectedPackageData: { id: 99 },
    updateItemQuantity: mockUpdateItemQuantity,
  })

  mockUpdateItemQuantity.mockClear()
})

describe('PackedItem', () => {
  it('renders SKU and location correctly', () => {
    render(<PackedItem item={sampleItem} />)

    expect(screen.getByText('SKU-123')).toBeInTheDocument()
    expect(screen.getByText('B2')).toBeInTheDocument()
  })

  it('renders NumberSpinner with correct max and value', () => {
    render(<PackedItem item={sampleItem} />)

    const spinner = screen.getByLabelText('Item quantity') as HTMLInputElement
    expect(spinner.value).toBe('5')
  })
})
