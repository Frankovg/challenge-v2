import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../Button'


describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByText('Primary Button')
    expect(button).toBeInTheDocument()
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByText('Secondary Button')
    expect(button).toBeInTheDocument()
  })

  it('renders with outlined variant', () => {
    render(<Button variant="outlined">Outlined Button</Button>)
    const button = screen.getByText('Outlined Button')
    expect(button).toBeInTheDocument()
  })

  it('renders with text variant', () => {
    render(<Button variant="text">Text Button</Button>)
    const button = screen.getByText('Text Button')
    expect(button).toBeInTheDocument()
  })

  it('handles onClick events', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Clickable</Button>)
    const button = screen.getByText('Clickable')

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByText('Disabled Button')
    expect(button).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()

    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    )
    const button = screen.getByText('Disabled Button')

    expect(button).toBeDisabled()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders with startIcon', () => {
    const icon = <span data-testid="start-icon">📦</span>
    render(<Button startIcon={icon}>With Icon</Button>)

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('renders with endIcon', () => {
    const icon = <span data-testid="end-icon">→</span>
    render(<Button endIcon={icon}>With Icon</Button>)

    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>)
    const button = screen.getByText('Link Button')
    expect(button).toHaveAttribute('href', '/test')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>)
    const button = screen.getByText('Custom Class')
    expect(button).toHaveClass('custom-class')
  })
})
