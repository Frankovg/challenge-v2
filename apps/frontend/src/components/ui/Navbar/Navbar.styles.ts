import { styled } from 'styled-components'

export const NavbarContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-base), border-color var(--transition-base);
`

export const NavContent = styled.div`
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-xl);
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

// export const ShipButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: var(--spacing-xs);
//   padding: var(--spacing-sm) var(--spacing-lg);
//   border: none;
//   border-radius: 6px;
//   background-color: #22c55e;
//   color: white;
//   font-size: var(--font-size-base);
//   font-weight: var(--font-weight-medium);
//   cursor: pointer;
//   transition: background-color var(--transition-base), transform 0.1s;

//   &:hover {
//     background-color: #16a34a;
//   }

//   &:active {
//     transform: scale(0.98);
//   }

//   svg {
//     width: 20px;
//     height: 20px;
//   }
// `
