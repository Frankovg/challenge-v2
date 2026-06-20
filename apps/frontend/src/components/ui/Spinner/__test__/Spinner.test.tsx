import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Spinner } from '../Spinner'

describe('Spinner', () => {
  it('renders the spinner container', () => {
    const { container } = render(<Spinner />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with the default size', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement

    expect(spinner).toHaveStyle(`width: 30px`)
    expect(spinner).toHaveStyle(`height: 30px`)
  })

  it('applies custom size', () => {
    const { container } = render(<Spinner size={50} />)
    const spinner = container.firstChild as HTMLElement

    expect(spinner).toHaveStyle(`width: 50px`)
    expect(spinner).toHaveStyle(`height: 50px`)
  })
})
