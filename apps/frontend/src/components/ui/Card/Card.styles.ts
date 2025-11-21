import { styled } from 'styled-components'

export const CardContainer = styled.div`
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-md);
  }
`
