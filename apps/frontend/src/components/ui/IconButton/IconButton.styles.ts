import { styled } from 'styled-components'

export const IconButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--transition-base), color var(--transition-base);

  &:hover {
    background-color: var(--bg-tertiary);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`
