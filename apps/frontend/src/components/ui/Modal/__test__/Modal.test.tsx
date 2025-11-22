import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Modal } from '../Modal'

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open onClose={() => { }}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render children when closed', () => {
    render(
      <Modal open={false} onClose={() => { }}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = jest.fn()
    render(
      <Modal open onClose={handleClose}>
        <div>Test Content</div>
      </Modal>
    )

    const backdrop = document.querySelector('[class*="MuiBackdrop"]')
    if (backdrop) {
      fireEvent.click(backdrop)
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled()
      })
    }
  })

  it('calls onClose when Escape key is pressed', async () => {
    const handleClose = jest.fn()
    render(
      <Modal open onClose={handleClose}>
        <div>Test Content</div>
      </Modal>
    )

    // Get the modal element and fire keydown on it
    const modal = document.querySelector('[role="presentation"]')
    if (modal) {
      fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' })

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled()
      })
    } else {
      throw new Error('Modal not found')
    }
  })

  it('unmounts content when keepMounted is false and modal is closed', () => {
    const { rerender } = render(
      <Modal open keepMounted={false} onClose={() => { }}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()

    rerender(
      <Modal open={false} keepMounted={false} onClose={() => { }}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('renders multiple children components', () => {
    render(
      <Modal open onClose={() => { }}>
        <div>
          <h2>Modal Title</h2>
          <p>Modal description</p>
          <button>Action Button</button>
        </div>
      </Modal>
    )

    expect(screen.getByText('Modal Title')).toBeInTheDocument()
    expect(screen.getByText('Modal description')).toBeInTheDocument()
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })
})
