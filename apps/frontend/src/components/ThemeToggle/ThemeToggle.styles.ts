import { styled } from 'styled-components'

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--bg-hover);
    border-color: var(--border-secondary);
  }

  &:active {
    background-color: var(--bg-active);
    transform: scale(0.95);
  }

  svg {
    transition: transform var(--transition-base);
  }

  &:hover svg {
    transform: rotate(15deg);
  }
`
