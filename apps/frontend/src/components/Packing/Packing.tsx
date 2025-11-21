'use client'

import React, { type FC } from 'react'

import { PackedSection } from './PackedSection'
import { PackingWrapper } from './Packing.styles'
import { UnpackedSection } from './UnpackedSection'

export const Packing: FC = () => {
  return (
    <PackingWrapper>
      <UnpackedSection />
      <PackedSection />
    </PackingWrapper>
  )
}
