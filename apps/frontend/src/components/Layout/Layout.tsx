'use client'

import { FC, ReactNode } from 'react'


import { Navbar } from 'components/ui/Navbar'

import { Main } from './Layout.styles'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
    </>
  )
}
