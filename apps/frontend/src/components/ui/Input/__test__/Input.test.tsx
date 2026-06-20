import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'

import { Input } from '../Input'

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input label="Name" />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('accepts and displays user input', async () => {
    const user = userEvent.setup()

    render(<Input label="Email" />)
    const input = screen.getByLabelText('Email')

    await user.type(input, 'hello@example.com')

    expect(input).toHaveValue('hello@example.com')
  })

  it('spreads props to the underlying TextField', () => {
    render(<Input placeholder="Type here" />)

    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('disables the input when disabled prop is passed', () => {
    render(<Input disabled label="Disabled field" />)
    const input = screen.getByLabelText('Disabled field')

    expect(input).toBeDisabled()
  })

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(<Input label="Test" onChange={onChange} />)
    const input = screen.getByLabelText('Test')

    await user.type(input, 'abc')

    expect(onChange).toHaveBeenCalled()
  })
})
