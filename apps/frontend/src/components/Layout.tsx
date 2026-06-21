'use client'

import { FC, ReactNode } from 'react'
import { styled } from 'styled-components'

import { Footer } from 'components/ui/Footer'
import { Navbar } from 'components/ui/Navbar'

const Root = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Main = styled.main`
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  background-color: var(--bg-secondary);
  transition: background-color var(--transition-base);
`

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <Root>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </Root>
  )
}
