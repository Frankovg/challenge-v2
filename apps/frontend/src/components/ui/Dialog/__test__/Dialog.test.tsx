import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Dialog } from '../Dialog'

describe('Dialog', () => {
  it('renders children when open', () => {
    render(
      <Dialog open onClose={() => { }}>
        <div>Test Content</div>
      </Dialog>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render children when closed', () => {
    render(
      <Dialog open={false} onClose={() => { }}>
        <div>Test Content</div>
      </Dialog>
    )

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = jest.fn()
    render(
      <Dialog open onClose={handleClose}>
        <div>Test Content</div>
      </Dialog>
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
      <Dialog open onClose={handleClose}>
        <div>Test Content</div>
      </Dialog>
    )

    // Get the modal element and fire keydown on it
    const modal = document.querySelector('[role="presentation"]')
    if (modal) {
      fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' })

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled()
      })
    } else {
      throw new Error('Dialog not found')
    }
  })

  it('unmounts content when keepMounted is false and modal is closed', () => {
    const { rerender } = render(
      <Dialog open keepMounted={false} onClose={() => { }}>
        <div>Test Content</div>
      </Dialog>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()

    rerender(
      <Dialog open={false} keepMounted={false} onClose={() => { }}>
        <div>Test Content</div>
      </Dialog>
    )

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('renders multiple children components', () => {
    render(
      <Dialog open onClose={() => { }}>
        <div>
          <h2>Dialog Title</h2>
          <p>Dialog description</p>
          <button>Action Button</button>
        </div>
      </Dialog>
    )

    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    expect(screen.getByText('Dialog description')).toBeInTheDocument()
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })
})
