'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { FC, ReactNode } from 'react'

import { NumberSpinnerContainer } from './NumberSpinner.styles'

type NumberSpinnerProps = {
  label?: string
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  size?: 'small' | 'medium'
  error?: boolean
  disabled?: boolean
  onChange?: (value: number) => void
  onBlur?: () => void
}

export const NumberSpinner: FC<NumberSpinnerProps> = ({
  label,
  value,
  defaultValue = 0,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  size = 'medium',
  error = false,
  disabled = false,
  onChange,
  onBlur,
}): ReactNode => {
  const currentValue = value ?? defaultValue

  const handleIncrement = (): void => {
    if (disabled) return
    const newValue = Math.min(currentValue + 1, max)
    onChange?.(newValue)
  }

  const handleDecrement = (): void => {
    if (disabled) return
    const newValue = Math.max(currentValue - 1, min)
    onChange?.(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return
    const inputValue = e.target.value
    if (inputValue === '') {
      onChange?.(min)
      return
    }

    const numValue = parseInt(inputValue, 10)
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, min), max)
      onChange?.(clampedValue)
    }
  }

  const handleBlur = (): void => {
    if (currentValue < min) {
      onChange?.(min)
    } else if (currentValue > max) {
      onChange?.(max)
    }
    onBlur?.()
  }

  return (
    <NumberSpinnerContainer $size={size} $error={error} $disabled={disabled}>
      {label && <label className="number-spinner-label">{label}</label>}
      <div className="number-spinner-wrapper">
        <input
          type="number"
          className="number-spinner-input"
          value={currentValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
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
            disabled={disabled || currentValue >= max}
            aria-label="Increment"
          >
            <ChevronUp size={size === 'small' ? 12 : 14} />
          </button>
          <button
            type="button"
            className="spinner-button spinner-button-down"
            onClick={handleDecrement}
            disabled={disabled || currentValue <= min}
            aria-label="Decrement"
          >
            <ChevronDown size={size === 'small' ? 12 : 14} />
          </button>
        </div>
      </div>
    </NumberSpinnerContainer>
  )
}
