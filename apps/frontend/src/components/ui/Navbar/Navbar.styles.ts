import { styled } from 'styled-components'

export const NavbarContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
`

export const NavContent = styled.div`
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: center;
`

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`
