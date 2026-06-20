import { fireEvent, render, screen } from '@testing-library/react'

import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders children when open', () => {
    render(
      <Dialog open onClose={() => {}}>
        <div>Test Content</div>
      </Dialog>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render children when closed', () => {
    render(
      <Dialog open={false} onClose={() => {}}>
        <div>Test Content</div>
      </Dialog>,
    )

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('calls onClose when the overlay is clicked', () => {
    const handleClose = jest.fn()
    render(
      <Dialog open onClose={handleClose}>
        <div>Test Content</div>
      </Dialog>,
    )

    fireEvent.mouseDown(screen.getByTestId('dialog-overlay'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when the content is clicked', () => {
    const handleClose = jest.fn()
    render(
      <Dialog open onClose={handleClose}>
        <div>Test Content</div>
      </Dialog>,
    )

    fireEvent.mouseDown(screen.getByText('Test Content'))

    expect(handleClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape is pressed', () => {
    const handleClose = jest.fn()
    render(
      <Dialog open onClose={handleClose}>
        <div>Test Content</div>
      </Dialog>,
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
