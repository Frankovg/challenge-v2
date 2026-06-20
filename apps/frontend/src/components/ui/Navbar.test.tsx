import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Navbar } from './Navbar'

jest.mock('components/Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}))

describe('Navbar', () => {
  it('renders the navbar container', () => {
    const { container } = render(<Navbar />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('renders the Logo component', () => {
    render(<Navbar />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
})
