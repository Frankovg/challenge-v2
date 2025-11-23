import { styled } from 'styled-components'

export const EmptyPackageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-block: var(--spacing-3xl);

  p {
    font-size: var(--font-size-sm)
  }

  svg {
    margin-bottom: var(--spacing-md);
  }
`

