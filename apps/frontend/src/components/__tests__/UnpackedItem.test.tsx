import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { UnpackedItem } from 'components/Packing/UnpackedItem'

describe('UnpackedItem', () => {
  const mockHandleClick = jest.fn()

  const item = {
    id: 1,
    sku: 'ABC123',
    location: 'a1',
    quantity: 5,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders SKU and location', () => {
    render(<UnpackedItem item={item} handleClick={mockHandleClick} />)
    expect(screen.getByText('sku')).toBeInTheDocument()
    expect(screen.getByText('ABC123')).toBeInTheDocument()
    expect(screen.getByText('A1')).toBeInTheDocument()
  })

  it('renders the quantity', () => {
    render(<UnpackedItem item={item} handleClick={mockHandleClick} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it("calls handleClick with 'one' when +1 button is clicked", async () => {
    const user = userEvent.setup()
    render(<UnpackedItem item={item} handleClick={mockHandleClick} />)
    const addOneButton = screen.getByText('+1')
    await user.click(addOneButton)
    expect(mockHandleClick).toHaveBeenCalledWith('one')
  })

  it("calls handleClick with 'all' when All button is clicked", async () => {
    const user = userEvent.setup()
    render(<UnpackedItem item={item} handleClick={mockHandleClick} />)
    const addAllButton = screen.getByText('All')
    await user.click(addAllButton)
    expect(mockHandleClick).toHaveBeenCalledWith('all')
  })
})
