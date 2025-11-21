import { styled } from 'styled-components'

export const Main = styled.main`
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  background-color: var(--bg-secondary);
  transition: background-color var(--transition-base);
`
