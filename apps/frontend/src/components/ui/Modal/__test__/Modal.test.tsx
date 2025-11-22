import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Modal } from '../Modal'

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render children when closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
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

  it('renders with aria-labelledby attribute', () => {
    render(
      <Modal open onClose={() => {}} ariaLabelledBy="modal-title">
        <div>
          <h2 id="modal-title">Modal Title</h2>
          <p>Modal content</p>
        </div>
      </Modal>
    )

    const modal = document.querySelector('[role="presentation"]')
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title')
  })

  it('renders with aria-describedby attribute', () => {
    render(
      <Modal open onClose={() => {}} ariaDescribedBy="modal-description">
        <div>
          <h2>Modal Title</h2>
          <p id="modal-description">Modal description</p>
        </div>
      </Modal>
    )

    const modal = document.querySelector('[role="presentation"]')
    expect(modal).toHaveAttribute('aria-describedby', 'modal-description')
  })

  it('keeps content mounted when keepMounted is true and modal is closed', () => {
    const { rerender } = render(
      <Modal open keepMounted onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()

    rerender(
      <Modal open={false} keepMounted onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    )

    // Content should still be in the DOM but not visible
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('unmounts content when keepMounted is false and modal is closed', () => {
    const { rerender } = render(
      <Modal open keepMounted={false} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()

    rerender(
      <Modal open={false} keepMounted={false} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    )

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('renders multiple children components', () => {
    render(
      <Modal open onClose={() => {}}>
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

  it('handles complex nested content', () => {
    render(
      <Modal open onClose={() => {}}>
        <div>
          <header>
            <h2>Header</h2>
          </header>
          <main>
            <p>Main content</p>
          </main>
          <footer>
            <button>Close</button>
          </footer>
        </div>
      </Modal>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
  })
})
