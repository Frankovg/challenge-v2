'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { FC, ReactNode } from 'react'

import { NumberSpinnerContainer } from './NumberSpinner.styles'

type NumberSpinnerProps = {
  label?: string
  value?: number
  min?: number
  max?: number
  disabled?: boolean
  onChange?: (value: number) => void
}

export const NumberSpinner: FC<NumberSpinnerProps> = ({
  label,
  value = 0,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disabled = false,
  onChange,
}): ReactNode => {
  const handleIncrement = (): void => {
    if (disabled) return
    const newValue = Math.min(value + 1, max)
    onChange?.(newValue)
  }

  const handleDecrement = (): void => {
    if (disabled) return
    const newValue = Math.max(value - 1, min)
    onChange?.(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return
    const inputValue = e.target.value.trim()

    if (inputValue === '') {
      onChange?.(min)
      return
    }
    if (!/^-?\d+$/.test(inputValue)) {
      return
    }
    const numValue = Number(inputValue)
    if (!Number.isFinite(numValue) || !Number.isSafeInteger(numValue)) {
      return
    }

    const clampedValue = Math.min(Math.max(numValue, min), max)
    onChange?.(clampedValue)
  }

  return (
    <NumberSpinnerContainer $disabled={disabled}>
      <div className="number-spinner-wrapper">
        <input
          type="number"
          className="number-spinner-input"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          aria-label={label}
        />
        <div className="number-spinner-buttons">
          <button
            type="button"
            className="spinner-button spinner-button-up"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            aria-label="Increment"
          >
            <ChevronUp size={12} />
          </button>
          <button
            type="button"
            className="spinner-button spinner-button-down"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            aria-label="Decrement"
          >
            <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </NumberSpinnerContainer>
  )
}
