import { Readex_Pro as FontSans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import React, { type ReactNode } from 'react'

import { MainLayout } from 'components/MainLayout'
import { Toast } from 'components/ui/toast'
import { ToastProvider } from 'components/ui/toast/ToastProvider'
import StyledComponentsRegistry from 'lib/StyledComponentsRegistry'

import { ApolloWrapper } from './ApolloWrapper'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'UI challenge Franco Amoroso',
  description: 'UI challenge application',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StyledComponentsRegistry>
            <ApolloWrapper>
              <ToastProvider>
                <MainLayout>{children}</MainLayout>
                <Toast />
              </ToastProvider>
            </ApolloWrapper>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}
