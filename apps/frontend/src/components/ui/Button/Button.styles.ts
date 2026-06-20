import { css, styled } from 'styled-components'

type StyledButtonProps = {
  $variant: 'primary' | 'secondary' | 'outlined' | 'text'
  $color: 'default' | 'success' | 'warning' | 'error'
}

const VARIANTS = {
  primary: css`
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: var(--button-primary-bg-hover);
      box-shadow: var(--shadow-md);
    }
    &:active:not(:disabled) {
      background-color: var(--button-primary-bg-active);
    }
  `,
  secondary: css`
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
    border: 1px solid var(--border-primary);

    &:hover:not(:disabled) {
      background-color: var(--button-secondary-bg-hover);
      border-color: var(--border-focus);
    }
    &:active:not(:disabled) {
      background-color: var(--button-secondary-bg-active);
    }
  `,
  outlined: css`
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-primary);

    &:hover:not(:disabled) {
      background-color: var(--bg-hover);
      border-color: var(--border-focus);
    }
    &:active:not(:disabled) {
      background-color: var(--bg-active);
    }
  `,
  text: css`
    background-color: transparent;
    color: var(--text-link);
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: var(--bg-hover);
      color: var(--text-link-hover);
    }
  `,
}

const COLORS = {
  default: css``,
  success: css`
    background-color: var(--color-green-500);
    color: var(--color-white);
    border-color: var(--color-green-500);
    &:hover:not(:disabled) {
      background-color: var(--color-green-700);
    }
  `,
  warning: css`
    background-color: var(--color-orange-500);
    color: var(--color-white);
    border-color: var(--color-orange-500);
    &:hover:not(:disabled) {
      background-color: var(--color-orange-700);
    }
  `,
  error: css`
    background-color: var(--color-red-500);
    color: var(--color-white);
    border-color: var(--color-red-500);
    &:hover:not(:disabled) {
      background-color: var(--color-red-700);
    }
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

  ${({ $variant }) => VARIANTS[$variant]}
  ${({ $color }) => COLORS[$color]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
