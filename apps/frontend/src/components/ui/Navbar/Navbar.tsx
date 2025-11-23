'use client'

import { User } from 'lucide-react'
import { ReactNode } from 'react'

import { Logo } from 'components/Logo'
import { ThemeToggle } from 'components/ThemeToggle'

import { IconButton } from '../IconButton'

import {
  ActionsSection,
  LogoSection,
  NavbarContainer,
  NavContent,
} from './Navbar.styles'

export const Navbar = (): ReactNode => {

  return (
    <NavbarContainer>
      <NavContent>
        <LogoSection>
          <Logo />
        </LogoSection>

        <ActionsSection>
          <ThemeToggle />
          <IconButton aria-label="User menu">
            <User />
          </IconButton>
        </ActionsSection>
      </NavContent>
    </NavbarContainer>
  )
}
