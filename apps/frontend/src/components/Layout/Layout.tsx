'use client'

import { FC, ReactNode } from 'react'

import { Header, Main } from './Layout.styles'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header>
        <p>UI challenge</p>
      </Header>

      <Main>{children}</Main>
    </>
  )
}
