'use client'

import { type ReactNode } from 'react'
import { styled } from 'styled-components'

import { Spinner } from 'components/ui/Spinner'

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;

  p {
    color: var(--text-secondary);
    font-size: 1rem;
  }
`

export default function Loading(): ReactNode {
  return (
    <LoadingContainer>
      <Spinner />
      <p>Loading products...</p>
    </LoadingContainer>
  )
}
