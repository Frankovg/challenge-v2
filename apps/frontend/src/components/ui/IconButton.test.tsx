import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'

import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('renders children', () => {
    render(<IconButton>Icon</IconButton>)
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  it('renders as a button element', () => {
    const { container } = render(<IconButton>Test</IconButton>)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('spreads button props onto the button element', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(<IconButton onClick={onClick}>Click</IconButton>)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('respects the disabled prop', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(
      <IconButton disabled onClick={onClick}>
        Disabled
      </IconButton>,
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
