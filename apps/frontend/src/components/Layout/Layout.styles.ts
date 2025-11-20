import { styled } from 'styled-components'

export const Header = styled.header`
  height: var(--header-height);
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  transition: background-color var(--transition-base), border-color var(--transition-base);
  z-index: var(--z-sticky);
`

export const HeaderTitle = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
`

export const Main = styled.main`
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  background-color: var(--bg-secondary);
  transition: background-color var(--transition-base);
`
