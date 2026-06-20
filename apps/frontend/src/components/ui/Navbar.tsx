'use client'

import { ReactNode } from 'react'
import { styled } from 'styled-components'

import { Logo } from 'components/Logo'
import { ThemeToggle } from 'components/ThemeToggle'
import { IconButton } from 'components/ui/IconButton'
import { User } from 'components/ui/icons'
import { Tooltip } from 'components/ui/Tooltip'

const NavbarContainer = styled.header`
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

const NavContent = styled.div`
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: center;
`

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`

export const Navbar = (): ReactNode => {
  return (
    <NavbarContainer>
      <NavContent>
        <LogoSection>
          <Logo />
        </LogoSection>

        <ActionsSection>
          <ThemeToggle />
          <Tooltip title="Not available">
            <IconButton aria-label="User menu">
              <User />
            </IconButton>
          </Tooltip>
        </ActionsSection>
      </NavContent>
    </NavbarContainer>
  )
}
