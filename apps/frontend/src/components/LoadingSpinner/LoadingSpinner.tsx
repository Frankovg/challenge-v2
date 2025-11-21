'use client'

import { type FC } from 'react'

import { LoadingContainer, Spinner } from './LoadingSpinner.styles'

export const LoadingSpinner: FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <p>Loading items...</p>
    </LoadingContainer>
  )
}
