import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { Barcode } from 'components/Packing/Barcode'
import { useApp } from 'hooks/useApp'
import { getProductByCode } from 'utils/lineItemOperations'


jest.mock('hooks/useApp')
jest.mock('utils/lineItemOperations')

describe('Barcode', () => {
  const mockPackProduct = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
      ; (useApp as jest.Mock).mockReturnValue({
        lineItems: [{ id: 1, sku: 'ABC', quantity: 5 }],
        selectedPackageData: { id: 10 },
        packProduct: mockPackProduct,
      })
  })

  test('submits valid barcode and calls packProduct', async () => {
    jest.mocked(getProductByCode).mockReturnValue({
      id: 1,
      sku: 'ABC',
      quantity: 5,
      location: 'A1',
    })

    render(<Barcode />)

    fireEvent.change(screen.getByPlaceholderText(/scan barcode/i), {
      target: { value: 'ABC' },
    })

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(mockPackProduct).toHaveBeenCalledWith(
        { id: 1, sku: 'ABC', quantity: 5, location: 'A1' },
        10,
        1,
      )
    })
  })

  test("shows 'product not found' toast when product is undefined", async () => {
    jest.mocked(getProductByCode).mockReturnValue(undefined)

    render(<Barcode />)

    fireEvent.change(screen.getByPlaceholderText(/scan barcode/i), {
      target: { value: 'XYZ' },
    })

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(mockPackProduct).toHaveBeenCalledWith(undefined, 10, 1)
    })
  })

  test('does not call packProduct when input is empty', async () => {
    render(<Barcode />)

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(mockPackProduct).not.toHaveBeenCalled()
    })
  })
})
