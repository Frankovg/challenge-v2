import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { ConfirmationModal } from 'components/packing/ConfirmationModal'

describe('ConfirmationModal', () => {
  const defaultProps = {
    close: jest.fn(),
    confirm: jest.fn(),
    title: 'Delete this item?',
    description: 'This action cannot be undone.',
    variant: 'delete' as const,
    buttonLabel: 'Delete',
    isLoading: false,
  }

  const setup = (props = {}) =>
    render(<ConfirmationModal {...defaultProps} {...props} />)

  test('renders title and description', () => {
    setup()

    expect(
      screen.getByRole('heading', { name: /delete this item\?/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/this action cannot be undone\./i),
    ).toBeInTheDocument()
  })

  test('renders correct button label', () => {
    setup()

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  test('calls close when clicking Cancel', async () => {
    const user = userEvent.setup()
    setup()

    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelBtn)

    expect(defaultProps.close).toHaveBeenCalledTimes(1)
  })

  test('calls confirm when clicking confirm button', async () => {
    const user = userEvent.setup()
    setup()

    const confirmBtn = screen.getByRole('button', { name: /delete/i })
    await user.click(confirmBtn)

    expect(defaultProps.confirm).toHaveBeenCalledTimes(1)
  })

  test('sets button color based on variant', () => {
    const { rerender } = render(
      <ConfirmationModal {...defaultProps} variant="delete" />,
    )

    let confirmBtn = screen.getByRole('button', { name: /delete/i })
    expect(confirmBtn).toHaveAttribute('data-color', 'warning')

    rerender(<ConfirmationModal {...defaultProps} variant="ship" />)

    confirmBtn = screen.getByRole('button', { name: /delete/i })
    expect(confirmBtn).toHaveAttribute('data-color', 'success')
  })
})
