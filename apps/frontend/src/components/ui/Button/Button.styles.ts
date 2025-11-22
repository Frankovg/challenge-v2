import MuiButton from '@mui/material/Button'
import { styled } from 'styled-components'

interface StyledButtonProps {
  $customVariant?: 'primary' | 'secondary' | 'outlined' | 'text'
}

export const StyledButton = styled(MuiButton) <StyledButtonProps>`
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  text-transform: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);

  ${(props) =>
    props.$customVariant === 'primary' &&
    `
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: none;
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--button-primary-bg-hover);
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background-color: var(--button-primary-bg-active);
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }

    &.Mui-disabled {
      background-color: var(--bg-disabled);
      color: var(--text-disabled);
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}

  ${(props) =>
    props.$customVariant === 'secondary' &&
    `
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--button-secondary-bg-hover);
      border-color: var(--border-focus);
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background-color: var(--button-secondary-bg-active);
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }

    &.Mui-disabled {
      background-color: var(--bg-disabled);
      color: var(--text-disabled);
      border-color: var(--border-primary);
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}

  ${(props) =>
    props.$customVariant === 'outlined' &&
    `
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-primary);

    &:hover:not(:disabled) {
      background-color: var(--bg-hover);
      border-color: var(--border-focus);
      box-shadow: var(--shadow-sm);
    }

    &:active:not(:disabled) {
      background-color: var(--bg-active);
    }

    &.Mui-disabled {
      background-color: transparent;
      color: var(--text-disabled);
      border-color: var(--border-primary);
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}

  ${(props) =>
    props.$customVariant === 'text' &&
    `
    background-color: transparent;
    color: var(--text-link);
    border: none;

    &:hover:not(:disabled) {
      background-color: var(--bg-hover);
      color: var(--text-link-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--bg-active);
    }

    &.Mui-disabled {
      background-color: transparent;
      color: var(--text-disabled);
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}

  &:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  &.MuiButton-sizeSmall {
    font-size: var(--font-size-xs);
    padding: calc(var(--spacing-xs) + 2px) var(--spacing-sm);
  }

  &.MuiButton-sizeLarge {
    font-size: var(--font-size-base);
    padding: var(--spacing-md) var(--spacing-lg);
  }

  &.MuiButton-fullWidth {
    width: 100%;
  }

  .MuiButton-startIcon {
    margin-right: var(--spacing-xs);
  }

  .MuiButton-endIcon {
    margin-left: var(--spacing-xs);
  }
`
