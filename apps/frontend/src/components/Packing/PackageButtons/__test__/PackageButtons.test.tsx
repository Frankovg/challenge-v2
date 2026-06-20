import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { PackageButtons } from '../PackageButtons'

describe('PackageButtons', () => {
  const mockAdd = jest.fn()
  const mockRemove = jest.fn()

  beforeEach(() => {
    mockAdd.mockClear()
    mockRemove.mockClear()
  })

  it('renders both buttons', () => {
    render(<PackageButtons add={mockAdd} remove={mockRemove} />)

    expect(screen.getByLabelText('Add package')).toBeInTheDocument()
    expect(screen.getByLabelText('Delete package')).toBeInTheDocument()
  })

  it('calls add callback when Add button is clicked', async () => {
    const user = userEvent.setup()
    render(<PackageButtons add={mockAdd} remove={mockRemove} />)

    const addButton = screen.getByLabelText('Add package')
    await user.click(addButton)

    expect(mockAdd).toHaveBeenCalledTimes(1)
  })

  it('calls remove callback when Delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<PackageButtons add={mockAdd} remove={mockRemove} />)

    const removeButton = screen.getByLabelText('Delete package')
    await user.click(removeButton)

    expect(mockRemove).toHaveBeenCalledTimes(1)
  })

  it('does not call remove callback if button is disabled', async () => {
    const user = userEvent.setup()
    render(<PackageButtons add={mockAdd} remove={mockRemove} disabledRemove />)

    const removeButton = screen.getByLabelText('Delete package')
    expect(removeButton).toBeDisabled()

    await user.click(removeButton)

    expect(mockRemove).not.toHaveBeenCalled()
  })

  it('renders tooltips on hover', async () => {
    const user = userEvent.setup()
    render(<PackageButtons add={mockAdd} remove={mockRemove} />)

    const addButton = screen.getByLabelText('Add package')
    const removeButton = screen.getByLabelText('Delete package')

    await user.hover(addButton)
    expect(await screen.findByText('Add Package')).toBeInTheDocument()
    await user.unhover(addButton)

    await user.hover(removeButton)
    expect(await screen.findByText('Delete Package')).toBeInTheDocument()
    await user.unhover(removeButton)
  })
})
