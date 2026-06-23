import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { findProductsBySku } from 'app/actions'
import { Barcode } from 'components/packing/Barcode'
import { useApp } from 'contexts/AppContext'

jest.mock('contexts/AppContext')
jest.mock('app/actions')
const mockAddToast = jest.fn()
jest.mock('components/ui/toast/ToastProvider', () => ({
  useToast: () => ({ add: mockAddToast }),
}))

describe('Barcode', () => {
  const mockPackProduct = jest.fn()

  const mockApp = (packages: unknown[]) =>
    (useApp as jest.Mock).mockReturnValue({
      packages,
      selectedPackageData: { id: 10 },
      packProduct: mockPackProduct,
    })

  beforeEach(() => {
    jest.clearAllMocks()
    mockApp([])
  })

  const scanAndSearch = (sku: string) => {
    render(<Barcode />)
    fireEvent.change(screen.getByPlaceholderText(/scan barcode/i), {
      target: { value: sku },
    })
    fireEvent.click(screen.getByRole('button', { name: /search/i }))
  }

  test('looks up the SKU server-side and packs the available location', async () => {
    jest
      .mocked(findProductsBySku)
      .mockResolvedValue([{ id: 1, sku: 'ABC', quantity: 5, location: 'A1' }])

    scanAndSearch('ABC')

    await waitFor(() => {
      expect(findProductsBySku).toHaveBeenCalledWith('ABC')
      expect(mockPackProduct).toHaveBeenCalledWith(
        { id: 1, sku: 'ABC', quantity: 5, location: 'A1' },
        10,
        1,
      )
    })
  })

  test('falls through to the next location when the first is exhausted', async () => {
    // green-ball in two locations: a1 (id 1, qty 5) and a4 (id 99, qty 2)
    jest.mocked(findProductsBySku).mockResolvedValue([
      { id: 1, sku: 'green-ball', quantity: 5, location: 'a1' },
      { id: 99, sku: 'green-ball', quantity: 2, location: 'a4' },
    ])
    // all 5 of id 1 already packed → must pick id 99
    mockApp([
      { data: { id: 0, line_items: [{ id: 1, sku: 'green-ball', quantity: 5 }] } },
    ])

    scanAndSearch('green-ball')

    await waitFor(() => {
      expect(mockPackProduct).toHaveBeenCalledWith(
        { id: 99, sku: 'green-ball', quantity: 2, location: 'a4' },
        10,
        1,
      )
    })
  })

  test('shows "product not found" when the SKU resolves to no records', async () => {
    jest.mocked(findProductsBySku).mockResolvedValue([])

    scanAndSearch('XYZ')

    await waitFor(() => {
      // Reuses the provider's not-found toast via packProduct(undefined).
      expect(mockPackProduct).toHaveBeenCalledWith(undefined, 10, 1)
    })
  })

  test('packs the last available unit (off-by-one boundary)', async () => {
    jest
      .mocked(findProductsBySku)
      .mockResolvedValue([{ id: 1, sku: 'ABC', quantity: 3, location: 'A1' }])
    // 2 of 3 already packed → exactly 1 available, must still pack.
    mockApp([
      { data: { id: 0, line_items: [{ id: 1, sku: 'ABC', quantity: 2 }] } },
    ])

    scanAndSearch('ABC')

    await waitFor(() => {
      expect(mockPackProduct).toHaveBeenCalledTimes(1)
    })
  })

  test('blocks and warns when every location is out of stock', async () => {
    jest
      .mocked(findProductsBySku)
      .mockResolvedValue([{ id: 1, sku: 'ABC', quantity: 2, location: 'A1' }])
    mockApp([
      { data: { id: 0, line_items: [{ id: 1, sku: 'ABC', quantity: 2 }] } },
    ])

    scanAndSearch('ABC')

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      )
    })
    expect(mockPackProduct).not.toHaveBeenCalled()
  })

  test('warns and does not pack when the server lookup fails', async () => {
    jest.mocked(findProductsBySku).mockRejectedValue(new Error('network down'))

    scanAndSearch('ABC')

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      )
    })
    expect(mockPackProduct).not.toHaveBeenCalled()
  })

  test('does nothing when the input is empty', async () => {
    scanAndSearch('')

    await waitFor(() => {
      expect(findProductsBySku).not.toHaveBeenCalled()
      expect(mockPackProduct).not.toHaveBeenCalled()
    })
  })
})
