import { styled } from 'styled-components'

export const PackedSectionContainer = styled.section`
  width: 70%;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-primary);
`

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-block: var(--spacing-3xl);

  p {
    font-size: var(--font-size-sm);
  }

  svg {
    margin-bottom: var(--spacing-md);
  }
`
