import { styled } from 'styled-components'

export const CardButtonContainer = styled.button`
  width: 2.3rem;
  height: 2.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm);
  background-color: var(--button-secondary-bg);
  color: var(--button-secondary-text);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
  box-shadow: var(--shadow-sm);

  &:hover:not(:disabled) {
    background-color: var(--button-secondary-bg-hover);
    border-color: var(--border-focus);
    box-shadow: var(--shadow-md);
    transform: translateY(-0.2px);
  }

  &:active:not(:disabled) {
    background-color: var(--button-secondary-bg-active);
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--bg-disabled);
    color: var(--text-disabled);
  }

  &:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`
