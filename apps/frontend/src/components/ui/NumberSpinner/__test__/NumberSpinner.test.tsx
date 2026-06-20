import { fireEvent, render, screen } from '@testing-library/react'

import { NumberSpinner } from '../NumberSpinner'

describe('NumberSpinner', () => {
  it('increments value when up button is clicked', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={5} onChange={handleChange} />)

    const incrementButton = screen.getByLabelText('Increment')
    fireEvent.click(incrementButton)

    expect(handleChange).toHaveBeenCalledWith(6)
  })

  it('decrements value when down button is clicked', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={5} onChange={handleChange} />)

    const decrementButton = screen.getByLabelText('Decrement')
    fireEvent.click(decrementButton)

    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('respects min value', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={10} min={10} onChange={handleChange} />)

    const decrementButton = screen.getByLabelText('Decrement')
    fireEvent.click(decrementButton)

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('respects max value', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={40} max={40} onChange={handleChange} />)

    const incrementButton = screen.getByLabelText('Increment')
    fireEvent.click(incrementButton)

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('allows manual input', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={5} onChange={handleChange} />)

    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: '15' } })

    expect(handleChange).toHaveBeenCalledWith(15)
  })

  it('clamps value to max on manual input', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={5} max={40} onChange={handleChange} />)

    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: '100' } })

    expect(handleChange).toHaveBeenCalledWith(40)
  })

  it('clamps value to min on manual input', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner value={20} min={10} onChange={handleChange} />)

    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: '5' } })

    expect(handleChange).toHaveBeenCalledWith(10)
  })

  it('disables interactions when disabled', () => {
    const handleChange = jest.fn()
    render(<NumberSpinner disabled value={5} onChange={handleChange} />)

    const input = screen.getByRole('spinbutton')
    const incrementButton = screen.getByLabelText('Increment')
    const decrementButton = screen.getByLabelText('Decrement')

    expect(input).toBeDisabled()
    expect(incrementButton).toBeDisabled()
    expect(decrementButton).toBeDisabled()

    fireEvent.click(incrementButton)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
