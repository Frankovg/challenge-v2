'use client'

import React, { ReactNode, type FC } from 'react'

import { Header, Main } from './Layout.styles'

type LayoutProps = {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        <p>UI challenge</p>
      </Header>

      <Main>{children}</Main>
    </>
  )
}
