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
  // ShipButton,
} from './Navbar.styles'

export const Navbar = (): ReactNode => {
  // const handleShip = (): void => {
  //   // TODO: Implement ship functionality
  //   console.log('Ship all packages')
  // }
  //TODO: shipping button in packaged products
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
          {/* <ShipButton type="button" onClick={handleShip}>
              <Ship />
              Ship All Packages
            </ShipButton> */}
        </ActionsSection>
      </NavContent>
    </NavbarContainer>
  )
}
