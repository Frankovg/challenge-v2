'use client'

import { FC, ReactNode } from 'react'
import { styled } from 'styled-components'

import { ChevronDown, ChevronUp } from 'components/ui/icons'

type NumberSpinnerContainerProps = {
  $disabled: boolean
}

const NumberSpinnerContainer = styled.div<NumberSpinnerContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .number-spinner-label {
    font-size: 12px;
    font-weight: 500;
    color: ${({ $disabled }) =>
      $disabled ? 'var(--text-disabled)' : 'var(--text-secondary)'};
    transition: color var(--transition-base);
  }

  .number-spinner-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 80px;
  }

  .number-spinner-input {
    width: 100%;
    height: 32px;
    padding: 4px 32px 4px 8px;
    font-size: 13px;
    font-family: inherit;
    color: ${({ $disabled }) =>
      $disabled ? 'var(--text-disabled)' : 'var(--text-primary)'};
    background-color: ${({ $disabled }) =>
      $disabled ? 'var(--bg-tertiary)' : 'var(--bg-primary)'};
    border: 1px solid
      ${({ $disabled }) =>
        $disabled ? 'var(--border-tertiary)' : 'var(--border-secondary)'};
    border-radius: 6px;
    outline: none;
    transition: all var(--transition-base);

    &:hover:not(:disabled) {
      border-color: 'var(--border-primary)';
    }

    &:focus {
      border-color: 'var(--primary)';
      box-shadow: 0 0 0 3px 'rgba(25, 118, 210, 0.1)';
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .number-spinner-buttons {
    position: absolute;
    right: 2px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    height: calc(100% - 4px);
  }

  .spinner-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 50%;
    padding: 0;
    background-color: var(--bg-secondary);
    border: none;
    border-radius: 4px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover:not(:disabled) {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
      background-color: var(--primary);
      color: var(--text-on-primary);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    svg {
      pointer-events: none;
    }
  }

  .spinner-button-up {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .spinner-button-down {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`

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
