'use client'

import React, { type ReactNode } from 'react'

import { PackedSection } from './PackedSection'
import { PackingWrapper } from './Packing.styles'
import { UnpackedSection } from './UnpackedSection'

export const Packing = (): ReactNode => {
  return (
    <PackingWrapper>
      <UnpackedSection />
      <PackedSection />
    </PackingWrapper>
  )
}
