import { styled } from 'styled-components'

type NumberSpinnerContainerProps = {
  $disabled: boolean
}

export const NumberSpinnerContainer = styled.div<NumberSpinnerContainerProps>`
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
