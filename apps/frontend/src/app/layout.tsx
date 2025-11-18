import { Readex_Pro as FontSans } from "next/font/google";
import React, { type ReactNode } from 'react'

import { Layout } from 'components/Layout'
import StyledComponentsRegistry from 'lib/StyledComponentsRegistry'

import { ApolloWrapper } from './ApolloWrapper'

import type { Metadata } from 'next'
import 'assets/globals/styles.css'

export const metadata: Metadata = {
  title: "UI challenge Franco Amoroso",
  description: 'UI challenge application',
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <StyledComponentsRegistry>
          <ApolloWrapper>
            <Layout>{children}</Layout>
          </ApolloWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
