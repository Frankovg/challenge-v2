'use client'

import React, { type ReactNode } from 'react'

import { useApp } from 'hooks/useApp'
import { useLineItemsQuery } from 'hooks/useLineItemsQuery'

import { PackedSection } from './PackedSection'
import { PackingWrapper } from './Packing.styles'
import { UnpackedSection } from './UnpackedSection'

export const Packing = (): ReactNode => {
  const { lineItems } = useLineItemsQuery()
  const { resetDemo } = useApp()

  const handleResetDemo = () => {
    if (lineItems.length === 0) return;
    resetDemo(lineItems)
  }

  return (
    <PackingWrapper>
      <UnpackedSection />
      <PackedSection />
      {process.env.NODE_ENV === 'development' && lineItems.length > 0 && (
        <button className='reset-button' onClick={handleResetDemo}>
          RESET DEMO
        </button>
      )}
    </PackingWrapper>
  )
}
