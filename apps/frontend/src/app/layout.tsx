import { Toast as MuiToast } from "@base-ui-components/react/toast";
import { Readex_Pro as FontSans } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import React, { type ReactNode } from 'react'

import { Layout } from 'components/Layout'
import { Toast } from "components/ui/Toast";
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StyledComponentsRegistry>
            <ApolloWrapper>
              <MuiToast.Provider>
                <Layout>{children}</Layout>
                <Toast />
              </MuiToast.Provider>
            </ApolloWrapper>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}
