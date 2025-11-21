'use client'

import React, { type FC } from 'react'

import { PackedSection } from './PackedSection'
import { DashboardWrapper } from './Packing.styles'
import { UnpackedSection } from './UnpackedSection'

export const Packing: FC = () => {
  return (
    <DashboardWrapper>
      <UnpackedSection />
      <PackedSection />
    </DashboardWrapper>
  )
}
