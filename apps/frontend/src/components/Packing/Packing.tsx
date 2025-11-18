'use client'

import React, { useEffect, type FC } from 'react'

import { DashboardWrapper, PackingSection } from './Packing.styles'
import { useLineItemsQuery } from './useLineItemsQuery'
import { PackageTab } from './PackageTab'
import { PackageContent } from './PackageContent'

export const Packing: FC = () => {
  const { lineItems } = useLineItemsQuery()

  useEffect(() => {
    if (lineItems.length > 0) {
      console.log('Line items ready to pack:', lineItems)
    }
  }, [lineItems])

  return (
    <DashboardWrapper>
      <PackingSection>Unpacked products</PackingSection>

      <PackingSection>
        <h3>Packed Products</h3>
        <button>Add Package</button>
        <hr />
        <PackageTab number={1} />
        <PackageTab active number={2} />
        <PackageTab number={3} />
        <PackageTab number={4} />
        <PackageContent />
      </PackingSection>
    </DashboardWrapper>
  )
}
