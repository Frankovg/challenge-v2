import { styled } from 'styled-components'

export const IconButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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
    width: 20px;
    height: 20px;
  }
`
