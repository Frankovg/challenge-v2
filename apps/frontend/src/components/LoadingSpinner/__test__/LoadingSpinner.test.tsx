import { render, screen } from '@testing-library/react'

import { LoadingSpinner } from '../LoadingSpinner'


describe('LoadingSpinner', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading items...')).toBeInTheDocument()
  })

  it('renders spinner element', () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.querySelector('div > div')
    expect(spinner).toBeInTheDocument()
  })
})
