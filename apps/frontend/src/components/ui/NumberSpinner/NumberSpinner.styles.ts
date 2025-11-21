import { styled } from 'styled-components'

type NumberSpinnerContainerProps = {
  $size: 'small' | 'medium'
  $error: boolean
  $disabled: boolean
}

export const NumberSpinnerContainer = styled.div<NumberSpinnerContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $size }) => ($size === 'small' ? '4px' : '6px')};

  .number-spinner-label {
    font-size: ${({ $size }) => ($size === 'small' ? '12px' : '14px')};
    font-weight: 500;
    color: ${({ $error, $disabled }) =>
      $disabled ? 'var(--text-disabled)' :
      $error ? 'var(--error)' :
      'var(--text-secondary)'};
    transition: color var(--transition-base);
  }

  .number-spinner-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: ${({ $size }) => ($size === 'small' ? '80px' : '100px')};
  }

  .number-spinner-input {
    width: 100%;
    height: ${({ $size }) => ($size === 'small' ? '32px' : '40px')};
    padding: ${({ $size }) => ($size === 'small' ? '4px 32px 4px 8px' : '8px 40px 8px 12px')};
    font-size: ${({ $size }) => ($size === 'small' ? '13px' : '14px')};
    font-family: inherit;
    color: ${({ $disabled }) => ($disabled ? 'var(--text-disabled)' : 'var(--text-primary)')};
    background-color: ${({ $disabled }) => ($disabled ? 'var(--bg-tertiary)' : 'var(--bg-primary)')};
    border: 1px solid ${({ $error, $disabled }) =>
      $disabled ? 'var(--border-tertiary)' :
      $error ? 'var(--error)' :
      'var(--border-secondary)'};
    border-radius: 6px;
    outline: none;
    transition: all var(--transition-base);

    &:hover:not(:disabled) {
      border-color: ${({ $error }) => ($error ? 'var(--error)' : 'var(--border-primary)')};
    }

    &:focus {
      border-color: ${({ $error }) => ($error ? 'var(--error)' : 'var(--primary)')};
      box-shadow: 0 0 0 3px ${({ $error }) =>
        $error ? 'rgba(244, 67, 54, 0.1)' : 'rgba(25, 118, 210, 0.1)'};
    }

    /* Hide default number input arrows */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
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
    width: ${({ $size }) => ($size === 'small' ? '24px' : '32px')};
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
