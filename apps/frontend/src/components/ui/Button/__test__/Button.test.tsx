import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Button } from '../Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it.each(['primary', 'secondary', 'outlined', 'text'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<Button variant={variant}>Label</Button>)
      expect(screen.getByRole('button', { name: 'Label' })).toBeInTheDocument()
    },
  )

  it('calls onClick when pressed', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Press</Button>)
    await user.click(screen.getByRole('button', { name: 'Press' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled and ignores clicks when disabled', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Disabled' })

    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('disables the button and shows the indicator while loading', () => {
    render(
      <Button loading loadingIndicator={<span data-testid="spinner" />}>
        Save
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('forwards the type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute(
      'type',
      'submit',
    )
  })
})
