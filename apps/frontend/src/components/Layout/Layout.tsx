'use client'

import { FC, ReactNode } from 'react'

import { ThemeToggle } from 'components/ThemeToggle'

import { Header, HeaderTitle, Main } from './Layout.styles'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header>
        <HeaderTitle>UI challenge</HeaderTitle>
        <ThemeToggle />
      </Header>

      <Main>{children}</Main>
    </>
  )
}
