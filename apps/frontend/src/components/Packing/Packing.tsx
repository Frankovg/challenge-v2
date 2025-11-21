'use client'

import React, { type FC } from 'react'

import { LineItemType } from 'types'

import { PackedSection } from './PackedSection'
import { PackingWrapper } from './Packing.styles'
import { UnpackedSection } from './UnpackedSection'

type PackingProps = {
  initialLineItems: LineItemType[]
}

export const Packing: FC<PackingProps> = ({ initialLineItems }) => {
  return (
    <PackingWrapper>
      <UnpackedSection initialLineItems={initialLineItems} />
      <PackedSection />
    </PackingWrapper>
  )
}
