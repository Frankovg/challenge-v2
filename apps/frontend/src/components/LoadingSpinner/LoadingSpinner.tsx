'use client'

import { type FC } from 'react'

import { Spinner } from 'components/ui/Spinner'

import { LoadingContainer } from './LoadingSpinner.styles'

export const LoadingSpinner: FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <p>Loading products...</p>
    </LoadingContainer>
  )
}
