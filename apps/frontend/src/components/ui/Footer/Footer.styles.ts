import { styled } from 'styled-components'

export const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
`
export const FooterContent = styled.div`
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: var(--font-size-xs);
  }

  a {
    font-size: var(--font-size-sm);
  }
`
